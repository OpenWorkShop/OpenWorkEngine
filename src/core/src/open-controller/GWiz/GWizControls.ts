import {IVisualizerControlsPreferences, ViewPlane} from './types';
import {Logger} from '../../utils/logging';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Vector3} from 'three';
import GWizCamera from './GWizCamera';
import {IOpenController} from '../Context';

class GWizControls extends OrbitControls {
  public log: Logger;
  private _openController: IOpenController;
  private _camera: GWizCamera;
  private _prefs: IVisualizerControlsPreferences = {};
  private _viewPlane: ViewPlane = ViewPlane.None;

  constructor(camera: GWizCamera, domElement: HTMLCanvasElement, oc: IOpenController) {
    super(camera, domElement);
    this.log = oc.ows.logManager.getLogger('GWizControls');
    this._openController = oc;
    this._camera = camera;
    // this.controls.enableDamping = true;
    this.enableKeys = true;
    this.addEventListener('change', (e) => {
      this.log.verbose('change', camera.position, e);
    });
  }

  applyPreferences(prefs: IVisualizerControlsPreferences): void {
    this.log.debug('controls', prefs, this._viewPlane);
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

    if (this._viewPlane !== ViewPlane.None) {
      this.enableRotate = false;
    } else if (prefs.rotateSpeed) {
      this.rotateSpeed = prefs.rotateSpeed;
      this.enableRotate = true;
    } else if (prefs.rotateSpeed !== undefined) {
      this.enableRotate = false;
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
    this.maxDistance = maxAxisRange * 1.2;
    this.minDistance = minAxisAccuracy;
    this.update();
  }

  applyViewPlane(viewPlane: ViewPlane): void {
    this._viewPlane = viewPlane;
    this.applyPreferences(this._prefs);
  }

  animate(): void {
    this.update();
  }
}

export default GWizControls;
