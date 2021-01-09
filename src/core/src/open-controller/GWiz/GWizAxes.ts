import * as THREE from 'three';
import _ from 'lodash';
import {IMaterial, IVisualizerStyles, RenderGroupType} from './types';
import {IMachineAxis} from '../Machines';
import {iterateMachineAxisGridLines} from '../Machines/MachineAxis';

type LineMaterial = THREE.LineBasicMaterial | THREE.LineDashedMaterial;

export const defaultAxisMaterialParams: IMaterial = {
  color: '#444444',
};

class GWizAxes extends THREE.Group {
  private axes: IMachineAxis[] = [];

  private styles?: IVisualizerStyles;
  private _backgroundColor = new THREE.Color('white');
  private _materials: { [key: string]: LineMaterial } = {};

  private _imperial = false;

  private _lineGroups = {
    'X': new THREE.Group(),
    'Y': new THREE.Group(),
    'Z': new THREE.Group(),
  };

  private _textGroups = {
    'X': new THREE.Group(),
    'Y': new THREE.Group(),
    'Z': new THREE.Group(),
  };

  public constructor() {
    super();
    Object.values(this.allGroups).forEach(lg => this.add(lg));
    this.redraw();
  }

  get allGroups(): THREE.Group[] {
    return Object.values(this._lineGroups).concat(Object.values(this._textGroups));
  }

  private static clearGroup(group: THREE.Group): void {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
  }

  public redraw(axes?: IMachineAxis[], styles?: IVisualizerStyles): void {
    if (axes) {
      this.axes = axes;
    }
    if (styles) {
      this.styles = styles;
    }
    Object.values(this.allGroups).forEach(lg => GWizAxes.clearGroup(lg));
    this._materials = {};
    Object.values(this.axes).forEach(this.drawAxis.bind(this));
  }

  private getAxisMaterial(axisName: string, isMajor: boolean, isEdge: boolean): LineMaterial {
    const key = `${axisName}-${isMajor ? 'major' : 'minor'}-${isEdge ? 'edge' : 'inner'}`;
    if (!this._materials[key]) this._materials[key] = this.createAxisMaterial(axisName, isMajor, isEdge);
    return this._materials[key];
  }

  private static getRenderGroup(axisName: string): RenderGroupType {
    if (axisName === 'X') return RenderGroupType.X;
    if (axisName === 'Y') return RenderGroupType.Y;
    if (axisName === 'Z') return RenderGroupType.Z;
    return RenderGroupType.None;
  }

  private createAxisMaterial(axisName: string, isMajor: boolean, isEdge: boolean): LineMaterial {
    const renderGroup = GWizAxes.getRenderGroup(axisName);
    const params = { ...(this.styles?.renderGroups[renderGroup] ?? defaultAxisMaterialParams) };

    const dashed = !isMajor && !isEdge;

    // Minor line.
    if (dashed) {
      const color = new THREE.Color(params.color).lerp(this._backgroundColor, 0.75);
      return new THREE.LineDashedMaterial({ ...params, color });
    }

    // Prevent warnings...
    return new THREE.LineBasicMaterial(params);
  }

  private drawAxis(axis: IMachineAxis) {
    const a = axis.name.toUpperCase();
    const yAxis = _.find(this.axes, a => a.name === 'Y');
    const xAxis = _.find(this.axes, a => a.name === 'X');
    iterateMachineAxisGridLines(axis, (dist: number, isMajor: boolean, isEdge: boolean) => {
      const material = this.getAxisMaterial(a, isMajor, isEdge);
      if (a === 'X') {
        this._lineGroups[a].add(GWizAxes.createLine(
          new THREE.Vector3(dist, yAxis?.min ?? 0, 0),
          new THREE.Vector3(dist, yAxis?.max ?? 0, 0),
          material
        ));
      }
      if (a === 'Y') {
        this._lineGroups[a].add(GWizAxes.createLine(
          new THREE.Vector3(xAxis?.min ?? 0, dist, 0),
          new THREE.Vector3(xAxis?.max ?? 0, dist, 0),
          material
        ));
      }
      if (a === 'Z') {
        this._lineGroups[a].add(GWizAxes.createLine(
          new THREE.Vector3(0, yAxis?.min ?? 0, dist),
          new THREE.Vector3(0, yAxis?.max ?? 0, dist),
          material
        ));
      }
    }, this._imperial);
  }

  private static createLine(p1: THREE.Vector3, p2: THREE.Vector3, mat: THREE.Material): THREE.Line {
    const points: THREE.Vector3[] = [p1, p2];
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, mat );
    line.computeLineDistances();
    return line;
  }
}

export default GWizAxes;
