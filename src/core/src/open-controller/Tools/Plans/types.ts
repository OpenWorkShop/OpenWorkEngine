import {ProgramFileFragment} from '../../graphql';

export type ProgramFileHandler = (programFile: ProgramFileFragment) => void;

export interface IHaveProgramFile {
  programFile: ProgramFileFragment;
}
