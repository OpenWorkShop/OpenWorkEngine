import * as THREE from 'three';
import {Quaternion, Vector3} from 'three';
import {IVisualizerCameraState, ViewSide} from '../types';
import {isSide} from '../sides';
import GWizCanvas from './GWizCanvas';

class GWizCamera extends THREE.PerspectiveCamera {
  private _canvas: GWizCanvas;

  public get distance(): number {
    return this.position.distanceTo(this._canvas.center);
  }

  public get zoomPercent(): number {
    return 1 - Math.max(0, Math.min(1, (this.distance) / this._canvas.controls.maxDistance));
  }

  constructor(canvas: GWizCanvas) {
    super();
    this._canvas = canvas;
  }

  setRange(minAxisAccuracy: number, maxAxisRange: number): void {
    this.far = maxAxisRange;
    this.near = minAxisAccuracy;
    this.updateProjectionMatrix();
  }

  private _lastState?: IVisualizerCameraState;

  // Load from settings... called often.
  applyState(state: IVisualizerCameraState): boolean {
    if (this.quaternion.equals(state.quaternion) ?? false) return false;
    this.quaternion.copy(state.quaternion);
    this.position.copy(state.position);
    return true;
  }

  clearChanges(): IVisualizerCameraState | undefined {
    const quaternion = this.quaternion.clone();
    const position = this.position.clone();
    if (this._lastState && quaternion.equals(this._lastState.quaternion) && position.equals(this._lastState.position))
      return undefined;
    return this._lastState = { quaternion, position };
  }

  vectorEquals(v1?: Vector3, v2?: Vector3): boolean {
    if (!v1 && !v2) return true;
    if (!v1 || !v2) return false;
    const m = 0.00001;
    return Math.abs(v1.x - v2.x) < m && Math.abs(v1.y - v2.y) < m && Math.abs(v1.z - v2.z) < m;
  }

  lookAtSides(sides: ViewSide): void {
    const cp = this.position;
    let lookAt: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    if (isSide(sides, ViewSide.Top) || isSide(sides, ViewSide.Bottom)) {
      lookAt = new THREE.Vector3(cp.x, cp.y, 0);
    }
    if (isSide(sides, ViewSide.Left) || isSide(sides, ViewSide.Right)) {
      lookAt = new THREE.Vector3(0, cp.y, cp.z);
    }
    if (isSide(sides, ViewSide.Front) || isSide(sides, ViewSide.Back)) {
      lookAt = new THREE.Vector3(cp.x, 0, cp.z);
    }

    this._canvas.setCenter(lookAt);
    const dist = this.position.distanceTo(lookAt);
    if (dist >= this.far) {
      this.position.copy(lookAt.normalize().multiplyScalar(this.far));
    }
    // this.up.set(up.x, up.y, up.z);
  }
}

export default GWizCamera;
