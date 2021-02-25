import * as THREE from 'three';
import {IMaterial, IVisualizerSceneState, IVisualizerStyles, RenderGroupType} from '../types';
import {
  Axis3D,
  axisRound,
  getMachineAxisMap,
  IMachineAxis,
  iterateMachineAxisGridLines,
  MachineAxisMap
} from '../../Machines';
import createTextSprite from './TextSprite';
import {AxisName, AxisPlane, UnitType} from '../../graphql';
import {mm2} from '../../../components/Units';
import {getAxisPlaneAxes} from '../../Machines/AxisName';

type LineMaterial = THREE.LineBasicMaterial | THREE.LineDashedMaterial;

export const defaultAxisMaterialParams: IMaterial = {
  color: '#444444',
};

interface IAxisLine {
  dist: number,
  colorize: boolean,
  isMajor: boolean,
  isEdge: boolean,
}

interface IDrawnAxisLine extends IAxisLine {
  obj: THREE.Line,
  text?: THREE.Object3D,
}

interface IDrawnAxis {
  axisName: AxisName;
  primaryLine?: IDrawnAxisLine;
  gridLines: IDrawnAxisLine[];
}

class GWizAxes extends THREE.Group {
  private drawnAxes: IDrawnAxis[] = [];

  private _sceneState?: IVisualizerSceneState;

  private _axisMap: MachineAxisMap = {};

  private _styles: IVisualizerStyles;
  private _backgroundColor = new THREE.Color('white');
  private _materials: { [key: string]: LineMaterial } = {};

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

  public get units(): UnitType { return this._sceneState?.units ?? UnitType.Metric; }
  public get axisPlane(): AxisPlane { return this._sceneState?.axisPlane ?? AxisPlane.Xy; }

  public constructor(styles: IVisualizerStyles) {
    super();
    this._styles = styles;
    Object.values(this.allGroups).forEach(lg => this.add(lg));
    this.redraw();
  }

  public applySceneState(sceneState: IVisualizerSceneState): boolean {
    const ss = this._sceneState;
    const changed = !ss || sceneState.units != ss.units || sceneState.axisPlane != ss.axisPlane;
    if (changed) {
      this._sceneState = sceneState;
      this.redraw();
    }
    return changed;
  }

  public setZoom(percent: number): void {
    const p = (1 - percent * percent) * 1.5;
    const scaler = new THREE.Vector3(p, p, p);
    this.drawnAxes.forEach(da => {
      da.gridLines.forEach(gl => {
        gl.text?.scale.copy(scaler);
      });
    });
  }

  get allGroups(): THREE.Group[] {
    return Object.values(this._lineGroups).concat(Object.values(this._textGroups));
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
    Object.values(this.allGroups).forEach(lg => lg.clear());
    this.drawnAxes = Object.values(this._axisMap).map(this.drawAxis.bind(this));
  }

  private getAxisMaterial(axisName: AxisName, line: IAxisLine): LineMaterial {
    const key = `${axisName}-${line.isMajor ? 'major' : ''}-${line.isEdge ? 'edge' : ''}-${line.colorize ? 'c' : ''}`;
    if (!this._materials[key])
      this._materials[key] = this.createAxisMaterial(axisName, line.colorize, line.isMajor, line.isEdge);
    return this._materials[key];
  }

  private static getRenderGroup(axisName: AxisName): RenderGroupType {
    if (axisName === AxisName.X) return RenderGroupType.X;
    if (axisName === AxisName.Y) return RenderGroupType.Y;
    if (axisName === AxisName.Z) return RenderGroupType.Z;
    return RenderGroupType.None;
  }

  private createAxisMaterial(axisName: AxisName, colorize: boolean, isMajor: boolean, isEdge: boolean): LineMaterial {
    const renderGroup = GWizAxes.getRenderGroup(axisName);
    const groupParams = colorize ? this._styles.renderGroups[renderGroup] : this._styles.gridLines;
    const params = { ...(groupParams ?? defaultAxisMaterialParams) };

    const dashed = !isMajor && !isEdge;

    // Minor line.
    if (dashed) {
      const color = new THREE.Color(params.color).lerp(this._backgroundColor, 0.75);
      return new THREE.LineDashedMaterial({ ...params, color });
    }

    // Prevent warnings...
    return new THREE.LineBasicMaterial(params);
  }

  private drawPrimaryAxisLine(a: Axis3D, axis: IMachineAxis): IDrawnAxisLine {
    const axisLine: IAxisLine = { dist: 0, isMajor: true, isEdge: false, colorize: true };
    const material = this.getAxisMaterial(a, axisLine);
    const max = 100000;
    const line = GWizAxes.createLine(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        axis.name === AxisName.X ? max : 0,
        axis.name === AxisName.Y ? max : 0,
        axis.name === AxisName.Z ? -max : 0
      ),
      material
    );
    this._lineGroups[a].add(line);
    return { ...axisLine, obj: line };
  }

  private drawAxis(axis: IMachineAxis): IDrawnAxis {
    const a = axis.name as Axis3D;

    const ret: IDrawnAxis = { axisName: a, gridLines: [], primaryLine: this.drawPrimaryAxisLine(a, axis) };
    const yAxis = this._axisMap[AxisName.Y];
    const xAxis = this._axisMap[AxisName.X];
    const planeAxes = getAxisPlaneAxes(this.axisPlane);
    // const abbr = getDistanceUnitAbbreviationKey(this.units);

    iterateMachineAxisGridLines(axis, (dist: number, isMajor: boolean, isEdge: boolean) => {
      if (!planeAxes.includes(axis.name)) return;
      const axisLine: IAxisLine = { dist, isMajor, isEdge, colorize: false };
      const material = this.getAxisMaterial(a, axisLine);
      const p = new THREE.Vector3(0, 0, 0);
      let line: THREE.Line | undefined = undefined;
      if (a === AxisName.X) {
        line = GWizAxes.createLine(
          new THREE.Vector3(dist, yAxis?.min ?? 0, 0),
          new THREE.Vector3(dist, yAxis?.max ?? 0, 0),
          material
        );
        p.x = dist;
      }
      else if (a === AxisName.Y) {
        line = GWizAxes.createLine(
          new THREE.Vector3(xAxis?.min ?? 0, dist, 0),
          new THREE.Vector3(xAxis?.max ?? 0, dist, 0),
          material
        );
        p.y = dist;
      }
      else if (a === AxisName.Z) {
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
        const num = axisRound(axis, mm2(dist, this.units) || 0, this.units);
        drawnAxisLine.text = createTextSprite({
          ...p,
          size: 20,
          text: `${num}`, // ${abbr}
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
      ret.gridLines.push(drawnAxisLine);
    }, this.units);
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
