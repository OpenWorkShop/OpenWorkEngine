import * as THREE from 'three';
import {Quaternion, Vector3} from 'three';
import {IVisualizerCameraState, ViewSide} from '../types';
import {isSide} from '../sides';
import GWizCanvas from './GWizCanvas';

class GWizCamera extends THREE.PerspectiveCamera {
  private _direction = new Vector3();

  private _canvas: GWizCanvas;

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

  public get state(): IVisualizerCameraState {
    // this.getWorldDirection(this._direction);
    return { position: this.position.clone(), quaternion: this.quaternion.clone() };
  }

  // Load from settings... called often.
  applyState(state: IVisualizerCameraState): boolean {
    if (this.quaternion.equals(state.quaternion) ?? false) return false;
    this.quaternion.copy(state.quaternion);
    this.position.copy(state.position);
    return true;
  }

  clearChanges(): IVisualizerCameraState | undefined {
    const lq = this._lastState?.quaternion;
    if (lq && this.quaternion.equals(lq)) return undefined;
    this._lastState = this.state;
    return this._lastState;
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
