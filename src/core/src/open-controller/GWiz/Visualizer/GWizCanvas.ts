import _ from 'lodash';
import * as THREE from 'three';
import {IVisualizerStyles, ViewPlane} from '../types';
import {IOpenController} from '../../Context';
import {Logger} from '../../../utils/logging';
import GWizAxes from './GWizAxes';
import {getMachineAxisRange, getMachineAxisBoundingBox} from '../../Machines';
import {IMachineAxis} from '../../Machines';
import {defaultVisualizerStyles} from '../GWizSlice';
import GWizControls from './GWizControls';
import GWizCamera from './GWizCamera';
import GWizApplicator from './GWizApplicator';
import NavCube from './NavCube';
import {MachinePositionFragment} from '../../graphql';

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

  private _axes: IMachineAxis[] = [];
  private _viewPlane: ViewPlane = ViewPlane.None;

  public get domElement(): HTMLCanvasElement { return this.renderer.domElement; }

  constructor(oc: IOpenController) {
    this.openController = oc;
    this.log = oc.ows.logManager.getLogger('GWizCanvas');
    this.log.debug('create');

    this.renderer = new THREE.WebGLRenderer();

    // Scene
    this.scene = new THREE.Scene();
    this.axes = new GWizAxes(this.styles);
    this.applicator = new GWizApplicator(this.styles);
    this.scene.add(this.axes, this.applicator);

    this.camera = new GWizCamera();
    this.controls = new GWizControls(this);

    this.navCube = new NavCube(this, this.styles);
  }

  // Main startup (draw axes)
  draw(axes: IMachineAxis[], navCubeDiv: HTMLDivElement): void {
    this.log.verbose('axes', axes, this.styles);
    this._axes = axes;

    const maxAxisRange = _.max(Object.values(axes).map(getMachineAxisRange)) ?? defaultCameraFar;
    const minAccuracy = _.min(Object.values(axes).map(a => a.accuracy)) ?? defaultCameraNear;
    const maxRange = maxAxisRange * 1.25;

    this.camera.setRange( minAccuracy, maxRange);
    this.controls.setRange(minAccuracy, maxAxisRange * .75);

    const color = new THREE.Color(this.styles.backgroundColor);
    this.scene.fog = new THREE.Fog(color, maxAxisRange, maxRange);

    this.axes.redraw(axes);
    this.lookAt(this.target);

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

  lookAt(obj?: THREE.Object3D): void {
    this.target = obj;
    const fitOffset = 0.5;
    const box = this.getBoundingBox(obj);

    const size = box.getSize( new THREE.Vector3() );
    this.center = obj ? box.getCenter( new THREE.Vector3() ) : new THREE.Vector3();
    const target = this.center;

    const maxSize = Math.max( size.x, size.y, size.z );
    const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * this.camera.fov / 360 ) );
    const fitWidthDistance = fitHeightDistance / this.camera.aspect;
    const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );

    const direction = target.clone()
      .sub( this.camera.position )
      .normalize();

    const distanceVector = direction.multiplyScalar( distance );

    this.controls.lookAt(this.center);
    this.camera.position.copy( target ).sub(distanceVector);

    this.log.debug('cam', size, this.center, this.camera.position);
    this.updateNavCube();
  }

  updateNavCube(): void {
    const lookVector = this.center.clone().sub(this.camera.position).normalize();
    const camVector = this.camera.position.clone().normalize();
    this.navCube.update(camVector, lookVector);
  }

  applyViewPlane(viewPlane: ViewPlane): void {
    const dist = 100;
    this._viewPlane = viewPlane;
    if (viewPlane === ViewPlane.Top) this.camera.position.set(0, 0, dist);
    if (viewPlane === ViewPlane.Bottom) this.camera.position.set(0, 0, -dist);
    if (viewPlane === ViewPlane.Left) this.camera.position.set(-dist, 0, 0);
    if (viewPlane === ViewPlane.Right) this.camera.position.set(dist, 0, 0);
    if (viewPlane === ViewPlane.Front) this.camera.position.set(0, -dist, 0);
    if (viewPlane === ViewPlane.Front) this.camera.position.set(0, dist, 0);
    this.lookAt(this.target);
    this.controls.applyViewPlane(viewPlane);
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
    this.renderer.render( this.scene, this.camera );
  }
}

export default GWizCanvas;
