import GWizObject from './GWizObject';
import GWizCanvas from './GWizCanvas';
import {MachineMovementFragment, ProgramExecutorFragment, ProgramInstructionFragment} from '../../graphql';
import * as THREE from 'three';
import OpenProgram from '../../Programs/OpenProgram';
import {RenderGroupType} from '../types';

class GWizPlans extends GWizObject {
  private _program?: OpenProgram;

  public constructor(canvas: GWizCanvas) {
    super(canvas, RenderGroupType.P);
  }

  public setProgram(program?: ProgramExecutorFragment): void {
    const changed = program?.id != this._program?.id;
    if (!program) {
      this._program = undefined;
    } else if (changed) {
      this._program = new OpenProgram(program);
    } else if (this._program) {
      this._program.update(program);
    } else {
      return;
    }
    this.drawInstructions(program?.instructions?.nodes ?? []);
  }

  private drawInstructions(instructions: ProgramInstructionFragment[]): void {
    this.clear();
    this.log.debug('instructions', instructions);
    let pos = new THREE.Vector3(0, 0, 0);
    instructions.forEach(inst => {
      const motion = inst.steps.find(i => i.name === 'Motion');
      if (!motion || !motion.movement) return;

      if (motion.settingValue !== 'Linear') {
        // this.log.warn('inst', inst, motion);
        return;
      }

      const p2 = this.updateVector(pos, motion.movement);
      const points: THREE.Vector3[] = [pos, p2];
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      const line = new THREE.Line( geometry );
      line.computeLineDistances();
      line.material = this.defaultMeshMaterial;
      this.add(line);

      pos = p2;
    });
  }

  /*
  private makeInstanced( geometry: THREE.BufferGeometry, count: number ): void {
    const mesh = new THREE.InstancedMesh( geometry, this.defaultMeshMaterial, count );
    scene.add( mesh );
  }*/

  private updateVector(pos: THREE.Vector3, movement: MachineMovementFragment | undefined | null): THREE.Vector3 {
    if (!movement) return pos;
    return new THREE.Vector3(
      this.updateAxis(pos.x, movement.x),
      this.updateAxis(pos.y, movement.y),
      this.updateAxis(pos.z, movement.z),
    );
  }

  private updateAxis(old: number, val: number | undefined | null) {
    return val === undefined || val === null ? old : val;
  }
}

export default GWizPlans;
