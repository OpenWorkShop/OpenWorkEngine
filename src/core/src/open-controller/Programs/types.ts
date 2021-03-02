import {ProgramFileMetaFragment} from '../graphql';

export enum ProgramFileExtension {
  Gcode = 'gcode',
  Mpt = 'mpt',
  Mpf = 'mpf',
  Nc = 'nc'
}

export const programFileExtensions = Object.values(ProgramFileExtension);
export const programPickerAccept = '.' + programFileExtensions.join(', .');

export interface IProgramFileDirectory {
  path: string;
  fileExtensions: string[];
  programFileMetas: ProgramFileMetaFragment[];
  programFileMetaMap: { [key: string]: ProgramFileMetaFragment };
}

export type ProgramsState = {
  directory: IProgramFileDirectory;
}