import * as THREE from 'three';
import {RenderGroupType} from '@openworkshop/core/open-controller';
import GWizCanvas from './GWizCanvas';
import SelectableObjectGroup from './SelectableObjectGroup';
import {IMaterial} from '../types';

class GWizLocationPin extends SelectableObjectGroup {
  private _pinRadius = 2;
  private _radius = 8;
  private _length = 40;

  private _pinMesh: THREE.Mesh;
  private _ballMesh: THREE.Mesh;
  private _material: THREE.MeshBasicMaterial;

  public constructor(canvas: GWizCanvas) {
    super(canvas, RenderGroupType.P);
    [this._material, this._pinMesh, this._ballMesh] = this.redraw();
  }

  private redraw(): [THREE.MeshBasicMaterial, THREE.Mesh, THREE.Mesh] {
    if (this._pinMesh) this.remove(this._pinMesh);
    this._material =  new THREE.MeshBasicMaterial(this.defaultMaterial);
    this._pinMesh = this.createTip();
    this._ballMesh = this.createBall();

    this.add(this._pinMesh, this._ballMesh);
    return [this._material, this._pinMesh, this._ballMesh];
  }

  private createTip(): THREE.Mesh {
    const h = this._length - this._radius;
    const geometry = new THREE.ConeGeometry(this._pinRadius, h);
    geometry.rotateX(-Math.PI/2);
    geometry.translate(0, 0, h / 2); // Tip of cone = origin
    return new THREE.Mesh( geometry, this._material );
  }

  private createBall(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(this._radius, 32, 32);
    const ret = new THREE.Mesh( geometry, this._material );
    ret.position.copy(new THREE.Vector3(0, 0, this._length - this._radius));
    return ret;
  }
}

export default GWizLocationPin;

