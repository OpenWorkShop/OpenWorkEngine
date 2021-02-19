import {ProgramFragment} from '../graphql';

class OpenProgram {
  public get id(): string { return this._program.id; }

  private _program: ProgramFragment;

  public constructor(program: ProgramFragment) {
    this._program = program;
  }

  public update(program: ProgramFragment) {
    this._program = program;
  }
}

export default OpenProgram;
