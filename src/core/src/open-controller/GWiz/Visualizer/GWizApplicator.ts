import * as THREE from 'three';
import GWizObject from './GWizObject';
import GWizCanvas from './GWizCanvas';
import {RenderGroupType} from '../types';

class GWizApplicator extends GWizObject {
  private _tipRadius = 25.4/4;
  private _tipLength = 5;
  private _shaftRadius = 25.4/4;
  private _shaftLength = 35;

  private _tipMesh: THREE.Mesh;
  private _shaftMesh: THREE.Mesh;

  public constructor(canvas: GWizCanvas) {
    super(canvas, RenderGroupType.E);
    [this._tipMesh, this._shaftMesh] = this.redraw();
  }

  private redraw(): [THREE.Mesh, THREE.Mesh] {
    if (this._tipMesh) this.remove(this._tipMesh);
    if (this._shaftMesh) this.remove(this._shaftMesh);
    this._tipMesh = this.createTip();
    this._shaftMesh = this.createShaft();

    this.add(this._tipMesh, this._shaftMesh);
    return [this._tipMesh, this._shaftMesh];
  }

  private createTip(): THREE.Mesh {
    const geometry = new THREE.ConeGeometry(this._tipRadius, this._tipLength);
    geometry.rotateX(-Math.PI/2);
    geometry.translate(0, 0, this._tipLength / 2); // Tip of cone = origin

    return new THREE.Mesh( geometry, this.defaultMeshMaterial );
  }

  private createShaft(): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry( this._shaftRadius, this._shaftRadius, this._shaftLength, 32 );
    geometry.rotateX(-Math.PI/2);
    const ret = new THREE.Mesh( geometry, this.defaultMeshMaterial );
    ret.position.copy(new THREE.Vector3(0, 0, this._shaftLength/2 + this._tipLength));
    return ret;
  }
}

export default GWizApplicator;

