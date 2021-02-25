import {ProgramExecutorFragment} from '../graphql';

class OpenProgram {
  public get id(): string { return this._program.id; }

  private _program: ProgramExecutorFragment;

  public constructor(program: ProgramExecutorFragment) {
    this._program = program;
  }

  public update(program: ProgramExecutorFragment) {
    this._program = program;
  }
}

export default OpenProgram;
