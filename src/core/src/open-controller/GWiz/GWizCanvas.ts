import _ from 'lodash';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {IVisualizerControlsPreferences, IVisualizerStyles} from './types';
import {IOpenController} from '../Context';
import {Logger} from '../../utils/logging';
import GWizAxes from './GWizAxes';
import {getMachineAxisRange} from '../Machines/MachineAxis';
import theme from '../../themes/GWiz';
import {IMachineAxis} from '../Machines';
import {defaultVisualizerStyles} from './state';

const defaultCameraNear = 0.1;
const defaultCameraFar = 2000;

///
/// Wraps THREE.js into something a bit more friendly for React code.
///
class GWizCanvas {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public openController: IOpenController;
  public styles: IVisualizerStyles = defaultVisualizerStyles;
  public controls: OrbitControls;
  public axes: GWizAxes;
  public log: Logger;

  private _axes: IMachineAxis[];

  public get domElement(): HTMLCanvasElement { return this.renderer.domElement; }

  constructor(axes: IMachineAxis[], oc: IOpenController) {
    this._axes = axes;
    this.openController = oc;
    this.log = oc.ows.logManager.getLogger('GWizCanvas');
    this.log.debug('create', axes);

    this.renderer = new THREE.WebGLRenderer();

    // Scene
    this.scene = new THREE.Scene();

    this.axes = new GWizAxes();
    this.scene.add(this.axes);

    // Camera
    this.camera = new THREE.PerspectiveCamera( );
    this.camera.position.set( 0, 10, 50 );

    // Controls
    this.controls = new OrbitControls(this.camera, this.domElement);
    this.controls.enableDamping = true;
    this.controls.enableKeys = true;

    // Compute
    this.applyAxes(axes);

    this.animate();
  }

  applyAxes(axes: IMachineAxis[]): void {
    this.log.debug('axes', axes, this.styles);
    this._axes = axes;
    const maxAxisRange = _.max(Object.values(axes).map(getMachineAxisRange)) ?? defaultCameraFar;
    const minAccuracy = _.min(Object.values(axes).map(a => a.accuracy)) ?? defaultCameraNear;
    this.controls.maxZoom = maxAxisRange;
    this.camera.far = maxAxisRange;
    this.camera.near = minAccuracy;

    this.scene.fog = new THREE.Fog(this.styles.backgroundColor, maxAxisRange * 0.75, maxAxisRange);

    this.axes.redraw(axes, this.styles);
  }

  applyStyles(styles: IVisualizerStyles): void {
    this.styles = styles;
    this.scene.background = new THREE.Color(styles.backgroundColor);
    this.applyAxes(this._axes);
  }

  applyControls(prefs: IVisualizerControlsPreferences): void {
    this.log.verbose('controls', prefs);
    if (prefs.dampingFactor) {
      this.controls.dampingFactor = prefs.dampingFactor;
      this.controls.enableDamping = true;
    } else if (prefs.dampingFactor !== undefined) {
      this.controls.enableDamping = false;
    }

    if (prefs.panSpeed) {
      this.controls.panSpeed = prefs.panSpeed;
      this.controls.enablePan = true;
    } else if (prefs.panSpeed !== undefined) {
      this.controls.enablePan = false;
    }

    if (prefs.zoomSpeed) {
      this.controls.zoomSpeed = prefs.zoomSpeed;
      this.controls.enableZoom = true;
    } else if (prefs.zoomSpeed !== undefined) {
      this.controls.enableZoom = false;
    }

    if (prefs.rotateSpeed) {
      this.controls.rotateSpeed = prefs.rotateSpeed;
      this.controls.enableRotate = true;
    } else if (prefs.rotateSpeed !== undefined) {
      this.controls.enableRotate = false;
    }
  }

  processHexColor(hexStr: string) {
    while (hexStr.startsWith('#')) hexStr = hexStr.substr(1);
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
    this.controls.update();
    this.renderer.render( this.scene, this.camera );
  }
}

export default GWizCanvas;
