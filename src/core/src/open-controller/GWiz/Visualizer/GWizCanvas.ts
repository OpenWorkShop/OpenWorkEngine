import _ from 'lodash';
import * as THREE from 'three';
import {GWizActions, IVisualizerSceneState, IVisualizerStyles, ViewSide} from '../types';
import {IOpenController} from '../../Context';
import {Logger} from '../../../utils/logging';
import GWizAxes from './GWizAxes';
import {getMachineAxisBoundingBox, getMachineAxisRange, IMachineAxis} from '../../Machines';
import {defaultVisualizerStyles} from '../GWizSlice';
import GWizControls from './GWizControls';
import GWizCamera from './GWizCamera';
import GWizApplicator from './GWizApplicator';
import NavCube from './NavCube';
import {AxisPlane, MachinePositionFragment} from '../../graphql';

const defaultCameraNear = 0.1;
const defaultCameraFar = 2000;

///
/// Wraps THREE.js into something a bit more friendly for React code.
///
class GWizCanvas {
  public scene: THREE.Scene;
  public camera: GWizCamera;
  public renderer: THREE.WebGLRenderer;
  public openController: IOpenController;
  public styles: IVisualizerStyles = defaultVisualizerStyles;
  public controls: GWizControls;
  public axes: GWizAxes;
  public applicator: GWizApplicator;
  public log: Logger;
  public target?: THREE.Object3D;
  public center: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public navCube: NavCube;

  public actions: GWizActions;

  private _axes: IMachineAxis[] = [];

  public get domElement(): HTMLCanvasElement { return this.renderer.domElement; }

  constructor(oc: IOpenController, actions: GWizActions) {
    this.openController = oc;
    this.actions = actions;
    this.log = oc.ows.logManager.getLogger('GWizCanvas');
    this.log.debug('create');

    this.renderer = new THREE.WebGLRenderer();

    // Scene
    this.scene = new THREE.Scene();
    this.axes = new GWizAxes(this.styles);
    this.applicator = new GWizApplicator(this.styles);
    this.scene.add(this.axes, this.applicator);

    this.camera = new GWizCamera(this);
    this.controls = new GWizControls(this);

    this.navCube = new NavCube(this, this.styles);
  }

  // Main startup (draw axes)
  draw(axes: IMachineAxis[], navCubeDiv: HTMLDivElement): void {
    this._axes = axes;

    const maxAxisRange = _.max(Object.values(axes).map(getMachineAxisRange)) ?? defaultCameraFar;
    const minAccuracy = _.min(Object.values(axes).map(a => a.accuracy)) ?? defaultCameraNear;
    const maxRange = maxAxisRange * 1.25;

    this.camera.setRange( minAccuracy, maxRange);
    this.controls.setRange(minAccuracy, maxAxisRange * .75);

    const color = new THREE.Color(this.styles.backgroundColor);
    this.scene.fog = new THREE.Fog(color, maxAxisRange, maxRange);

    this.axes.redraw(this._axes);
    this.setTarget(this.target);

    // Start the animation loop.
    this.animate();

    // Begin nav cube
    this.navCube.draw(navCubeDiv);
  }

  updatePosition(pos: MachinePositionFragment): void {
    this.applicator.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z));
  }

  getBoundingBox(obj?: THREE.Object3D): THREE.Box3 {
    if (!obj) return getMachineAxisBoundingBox(this._axes);
    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject( obj );
    return boundingBox;
  }

  onCameraChanged(): void {
    // this.updateNavCube();
  }

  setCenter(point: THREE.Vector3): void {
    this.center = point;
    this.controls.lookAt(point);
    this.camera.lookAt(point);
  }

  private _axisPlane?: AxisPlane;

  applySceneState(sceneState?: IVisualizerSceneState): boolean {
    if (!sceneState) return false;
    let changed = false;
    changed = this.axes.applySceneState(sceneState) || changed;
    this.camera.applyState(sceneState.camera);
    if (this._axisPlane != sceneState.axisPlane && sceneState.axisPlane) {
      changed = true;
      this._axisPlane = sceneState.axisPlane;
      const dist = this.camera.far * 0.5;
      if (this._axisPlane === AxisPlane.Xy) {
        this.camera.position.copy(new THREE.Vector3(0, 0, dist));
        this.camera.lookAtSides(ViewSide.Top);
      } else if (this._axisPlane === AxisPlane.Yz) {
        this.camera.position.copy(new THREE.Vector3(dist, 0, 0));
        this.camera.lookAtSides(ViewSide.Front);
      } else if (this._axisPlane === AxisPlane.Xz) {
        this.camera.position.copy(new THREE.Vector3(0, dist, 0));
        this.camera.lookAtSides(ViewSide.Right);
      }
    }
    if (changed) {
      this.log.debug('sceneState', sceneState);
    }
    return changed;
  }

  setTarget(obj?: THREE.Object3D): void {
    this.target = obj;
    const fitOffset = 0.5;
    const box = this.getBoundingBox(obj);

    const size = box.getSize( new THREE.Vector3() );
    const target = obj ? box.getCenter( new THREE.Vector3() ) : new THREE.Vector3();

    const maxSize = Math.max( size.x, size.y, size.z );
    const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * this.camera.fov / 360 ) );
    const fitWidthDistance = fitHeightDistance / this.camera.aspect;
    const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );

    const direction = target.clone()
      .sub( this.camera.position )
      .normalize();

    const distanceVector = direction.multiplyScalar( distance );

    this.camera.position.copy( target ).sub(distanceVector);
    this.setCenter(target);

    this.updateNavCube();
  }

  updateNavCube(): void {
    const lookVector = this.center.clone().sub(this.camera.position).normalize();
    const camVector = this.camera.position.clone().normalize();
    this.navCube.update(camVector, lookVector);
  }

  applyStyles(styles: IVisualizerStyles): void {
    this.styles = styles;
    this.axes.applyStyles(styles);
    this.scene.background = new THREE.Color(styles.backgroundColor);
  }

  private _lastWidth = 0;
  private _lastHeight = 0;

  resize(width: number, height: number): void {
    const xDiff = Math.abs(this._lastWidth - width);
    const yDiff = Math.abs(this._lastHeight - height);
    const diff = xDiff + yDiff;
    if (diff < 1 || width < 1 || height < 1) {
      return;
    }

    this.log.debug('resize', width, height, xDiff, yDiff, this._lastWidth, this._lastHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height, false);
    this._lastWidth = width;
    this._lastHeight = height;
  }

  animate(): void {
    requestAnimationFrame( this.animate.bind(this) );
    this.controls.animate();
    const changes = this.camera.clearChanges();
    if (changes) {
      this.updateNavCube();
      this.actions.saveCameraState(changes);
    }

    this.renderer.render( this.scene, this.camera );
  }
}

export default GWizCanvas;
