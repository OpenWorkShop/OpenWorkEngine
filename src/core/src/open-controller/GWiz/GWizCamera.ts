import * as THREE from 'three';

class GWizCamera extends THREE.PerspectiveCamera {
  setRange(minAxisAccuracy: number, maxAxisRange: number): void {
    this.far = maxAxisRange;
    this.near = minAxisAccuracy;
    this.updateProjectionMatrix();
  }
}

export default GWizCamera;
