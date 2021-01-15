import {Button, FormControl } from '@material-ui/core';
import * as React from 'react';
import useLogger from '../../../utils/logging/UseLogger';
import {useTrans} from '../../Context';

const ProgramFilePicker: React.FunctionComponent = () => {
  const log = useLogger(ProgramFilePicker);
  const t = useTrans();

  function onFilesChosen(files: FileList | null): void {
    if (!files) {
      log.debug('no files selected');
      return;
    }
    log.debug('select', files);
    //
  }

  return (
    <FormControl >
      <Button component="label">
        {t('Upload Program')}
        <input
          type='file'
          hidden
          accept='.gcode, .nc'
          onChange={e => onFilesChosen(e.target.files)}
        />
      </Button>
    </FormControl>
  );
};

export default ProgramFilePicker;
