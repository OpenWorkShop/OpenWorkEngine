import _ from 'lodash';
import * as THREE from 'three';
import {IVisualizerStyles, ViewPlane} from './types';
import {IOpenController} from '../Context';
import {Logger} from '../../utils/logging';
import GWizAxes from './GWizAxes';
import {getMachineAxisRange, getMachineAxisBoundingBox} from '../Machines';
import {IMachineAxis} from '../Machines';
import {defaultVisualizerStyles} from './GWizSlice';
import GWizControls from './GWizControls';
import GWizCamera from './GWizCamera';

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
  public log: Logger;
  public target?: THREE.Object3D;

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
    this.scene.add(this.axes);

    // Camera
    this.camera = new GWizCamera();

    // Controls
    this.controls = new GWizControls(this.camera, this.domElement, oc);
  }

  // Main startup (draw axes)
  draw(axes: IMachineAxis[]): void {
    this.log.verbose('axes', axes, this.styles);
    this._axes = axes;

    const maxAxisRange = _.max(Object.values(axes).map(getMachineAxisRange)) ?? defaultCameraFar;
    const minAccuracy = _.min(Object.values(axes).map(a => a.accuracy)) ?? defaultCameraNear;

    this.camera.setRange( minAccuracy, maxAxisRange);
    this.controls.setRange(minAccuracy, maxAxisRange);

    // this.scene.fog = new THREE.Fog(this.styles.backgroundColor, maxAxisRange * 0.75, maxAxisRange);

    this.axes.redraw(axes);
    this.lookAt(this.target);

    // Start the animation loop.
    this.animate();
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
    const center = obj ? box.getCenter( new THREE.Vector3() ) : new THREE.Vector3();
    const target = center;

    const maxSize = Math.max( size.x, size.y, size.z );
    const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * this.camera.fov / 360 ) );
    const fitWidthDistance = fitHeightDistance / this.camera.aspect;
    const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );

    const direction = target.clone()
      .sub( this.camera.position )
      .normalize()
      .multiplyScalar( distance );

    this.controls.lookAt(center);
    this.camera.position.copy( target ).sub(direction);

    this.log.debug('cam', size, center, this.camera.position);
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
    if (diff < 1) {
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
