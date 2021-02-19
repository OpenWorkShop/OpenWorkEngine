import {IVisualizerControlsPreferences} from '../types';
import {Logger} from '../../../utils/logging';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Vector3} from 'three';
import {IOpenController} from '../../Context';
import GWizCanvas from './GWizCanvas';

class GWizControls extends OrbitControls {
  public log: Logger;
  private _canvas: GWizCanvas;
  private _prefs: IVisualizerControlsPreferences = {};

  private get openController(): IOpenController {
    return this._canvas.openController;
  }

  constructor(canvas: GWizCanvas) {
    super(canvas.camera, canvas.domElement);
    this._canvas = canvas;
    this.log = this.openController.ows.logManager.getLogger('GWizControls');
    // this.controls.enableDamping = true;
    this.enableKeys = true;
    this.addEventListener('change', (e) => {
      this._canvas.requestRender();
    });
  }

  applyPreferences(prefs: IVisualizerControlsPreferences): void {
    this.log.debug('controls', prefs);
    this._prefs = prefs;
    if (prefs.dampingFactor) {
      this.dampingFactor = prefs.dampingFactor;
      this.enableDamping = true;
    } else if (prefs.dampingFactor !== undefined) {
      this.enableDamping = false;
    }

    if (prefs.panSpeed) {
      this.panSpeed = prefs.panSpeed;
      this.enablePan = true;
    } else if (prefs.panSpeed !== undefined) {
      this.enablePan = false;
    }

    if (prefs.zoomSpeed) {
      this.zoomSpeed = prefs.zoomSpeed;
      this.enableZoom = true;
    } else if (prefs.zoomSpeed !== undefined) {
      this.enableZoom = false;
    }

    if (prefs.rotateSpeed) {
      this.rotateSpeed = prefs.rotateSpeed;
      this.enableRotate = true;
    } else {
      this.enableRotate = true;
    }
    this.update();
  }

  lookAt(target: Vector3): void {
    this.target.copy( target );
    this.update();
  }

  setRange(minAxisAccuracy: number, maxAxisRange: number): void {
    // this._controls.maxZoom = near;
    this.log.debug('range', maxAxisRange);
    this.maxDistance = maxAxisRange;
    this.minDistance = minAxisAccuracy;
    this.update();
  }

  animate(): void {
    this.update();
  }
}

export default GWizControls;
