import {Button, FormControl } from '@material-ui/core';
import * as React from 'react';
import useLogger from '../../../utils/logging/UseLogger';
import {useTrans} from '../../Context';
import {useUploadProgramMutation} from '../../graphql';

const ProgramFilePicker: React.FunctionComponent = () => {
  const log = useLogger(ProgramFilePicker);
  const t = useTrans();
  const [upload, uploaded ] = useUploadProgramMutation();

  async function onFilesChosen(files: FileList | null): Promise<void> {
    if (!files || files.length <= 0) {
      log.debug('no files selected');
      return;
    }
    for (let i=0; i<files.length; i++) {
      await uploadFile(files[i]);
    }
  }

  async function uploadFile(file: File): Promise<void> {
    const text = await file.text();
    log.debug('select', text);
    //const stream = files[0].stream();
    const { lastModified, type, name, size } = file;
    const variables = { fileUpload: { text, lastModified, type, name, size } };
    try {
      const res = await upload({ variables });
      log.debug('result', res, uploaded);
    } catch (e) {
      log.error(e, 'failed to upload');
    }
  }

  return (
    <FormControl >
      <Button variant="outlined" component="label">
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
