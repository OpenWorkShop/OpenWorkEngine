import * as THREE from 'three';
import _ from 'lodash';
import {IMaterial, IVisualizerStyles, RenderGroupType} from './types';
import {getMachineAxisMap, IMachineAxis, MachineAxisMap} from '../Machines';
import {iterateMachineAxisGridLines} from '../Machines/MachineAxis';
import createTextSprite from './TextSprite';
import {AxisName} from '../graphql';
import TextSprite from './TextSprite';

type LineMaterial = THREE.LineBasicMaterial | THREE.LineDashedMaterial;

export const defaultAxisMaterialParams: IMaterial = {
  color: '#444444',
};

interface IAxisLine {
  dist: number,
  isMajor: boolean,
  isEdge: boolean,
}

interface IDrawnAxisLine extends IAxisLine {
  obj: THREE.Line,
  text?: THREE.Object3D,
}

interface IDrawnAxis {
  axisName: AxisName;
  lines: IDrawnAxisLine[];
}

class GWizAxes extends THREE.Group {
  private drawnAxes: IDrawnAxis[] = [];

  private _axisMap: MachineAxisMap = {};

  private _styles: IVisualizerStyles;
  private _backgroundColor = new THREE.Color('white');
  private _materials: { [key: string]: LineMaterial } = {};

  private _imperial = false;

  private _lineGroups = {
    [AxisName.X]: new THREE.Group(),
    [AxisName.Y]: new THREE.Group(),
    [AxisName.Z]: new THREE.Group(),
  };

  private _textGroups = {
    [AxisName.X]: new THREE.Group(),
    [AxisName.Y]: new THREE.Group(),
    [AxisName.Z]: new THREE.Group(),
  };

  public constructor(styles: IVisualizerStyles) {
    super();
    this._styles = styles;
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

  applyStyles(styles: IVisualizerStyles): void {
    this._styles = styles;
    this._materials = {};
    this.redraw();
    //
    // // Update all lines & text with new materials.
    // Object.values(this.drawnAxes).forEach((drawn) => {
    //   drawn.lines.forEach((line) => {
    //     const material = this.getAxisMaterial(drawn.axisName, line);
    //     line.obj.material = material;
    //     if (line.text) {
    //       // Text is recreated, because font changes can change geometry.
    //     }
    //   });
    // });
  }

  public redraw(axes?: IMachineAxis[]): void {
    this._axisMap = axes ? getMachineAxisMap(axes) : this._axisMap;
    Object.values(this.allGroups).forEach(lg => GWizAxes.clearGroup(lg));
    this.drawnAxes = Object.values(this._axisMap).map(this.drawAxis.bind(this));
  }

  private getAxisMaterial(axisName: AxisName, line: IAxisLine): LineMaterial {
    const key = `${axisName}-${line.isMajor ? 'major' : 'minor'}-${line.isEdge ? 'edge' : 'inner'}`;
    if (!this._materials[key]) this._materials[key] = this.createAxisMaterial(axisName, line.isMajor, line.isEdge);
    return this._materials[key];
  }

  private static getRenderGroup(axisName: AxisName): RenderGroupType {
    if (axisName === 'X') return RenderGroupType.X;
    if (axisName === 'Y') return RenderGroupType.Y;
    if (axisName === 'Z') return RenderGroupType.Z;
    return RenderGroupType.None;
  }

  private createAxisMaterial(axisName: AxisName, isMajor: boolean, isEdge: boolean): LineMaterial {
    const renderGroup = GWizAxes.getRenderGroup(axisName);
    const params = { ...(this._styles.renderGroups[renderGroup] ?? defaultAxisMaterialParams) };

    const dashed = !isMajor && !isEdge;

    // Minor line.
    if (dashed) {
      const color = new THREE.Color(params.color).lerp(this._backgroundColor, 0.75);
      return new THREE.LineDashedMaterial({ ...params, color });
    }

    // Prevent warnings...
    return new THREE.LineBasicMaterial(params);
  }

  private drawAxis(axis: IMachineAxis): IDrawnAxis {
    const a = axis.name;
    const ret: IDrawnAxis = { axisName: a, lines: [] };
    const yAxis = this._axisMap[AxisName.Y];
    const xAxis = this._axisMap[AxisName.X];

    iterateMachineAxisGridLines(axis, (dist: number, isMajor: boolean, isEdge: boolean) => {
      const axisLine: IAxisLine = { dist, isMajor, isEdge };
      const material = this.getAxisMaterial(a, axisLine);
      const p = new THREE.Vector3(0, 0, 0);
      let line: THREE.Line | undefined = undefined;
      if (a === 'X') {
        line = GWizAxes.createLine(
          new THREE.Vector3(dist, yAxis?.min ?? 0, 0),
          new THREE.Vector3(dist, yAxis?.max ?? 0, 0),
          material
        );
        p.x = dist;
      }
      else if (a === 'Y') {
        line = GWizAxes.createLine(
          new THREE.Vector3(xAxis?.min ?? 0, dist, 0),
          new THREE.Vector3(xAxis?.max ?? 0, dist, 0),
          material
        );
        p.y = dist;
      }
      else if (a === 'Z') {
        line = GWizAxes.createLine(
          new THREE.Vector3(0, yAxis?.min ?? 0, dist),
          new THREE.Vector3(0, yAxis?.max ?? 0, dist),
          material
        );
        p.z = dist;
      }
      else {
        throw new Error('Invalid axis');
      }
      this._lineGroups[a].add(line);
      const drawnAxisLine: IDrawnAxisLine = { ...axisLine, obj: line };
      if (isMajor) {
        drawnAxisLine.text = createTextSprite({
          ...p,
          size: 20,
          text: `${dist}mm`,
          textAlign: 'center',
          textBaseline: 'bottom',
          color: '#' + material.color.getHexString(),
          opacity: 1
        });
        if (drawnAxisLine.text) {
          this._textGroups[a].add(drawnAxisLine.text);
        }
        //
        // const textGeo = new THREE.TextGeometry( `${dist}mm`, {
        //   font: font,
        //   size: 14,
        //   height: 1,
        // } );
        // textGeo.computeBoundingBox();
        // textGeo.computeVertexNormals();
        // const mesh = new THREE.Mesh( textGeo, material );
        // if (a === 'X') mesh.position.x = dist;
        // else if (a === 'Y') mesh.position.y = dist;
        // else if (a === 'Z') mesh.position.z = dist;
        // this._textGroups[a].add(mesh);
      }
      ret.lines.push(drawnAxisLine);
    }, this._imperial);
    return ret;
  }

  private static createLine(p1: THREE.Vector3, p2: THREE.Vector3, mat: THREE.Material): THREE.Line {
    const points: THREE.Vector3[] = [p1, p2];
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry );
    line.computeLineDistances();
    line.material = mat;
    return line;
  }
}

export default GWizAxes;
