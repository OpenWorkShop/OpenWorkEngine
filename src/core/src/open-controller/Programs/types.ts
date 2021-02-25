export enum ProgramFileExtension {
  Gcode = 'gcode',
  Mpt = 'mpt',
  Mpf = 'mpf',
  Nc = 'nc'
}

export const programFileExtensions = Object.values(ProgramFileExtension);
export const programPickerAccept = '.' + programFileExtensions.join(', .');