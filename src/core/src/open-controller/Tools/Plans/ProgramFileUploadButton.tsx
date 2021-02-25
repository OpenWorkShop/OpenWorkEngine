import {Button, FormControl } from '@material-ui/core';
import * as React from 'react';
import {useTrans} from '../../Context';
import ProgramFileUploadDialog from './ProgramFileUploadDialog';
import {useLogger} from '../../../hooks';
import {programPickerAccept} from '../../Programs/types';
import {ProgramFileFragment} from '../../graphql';
import {ProgramFileHandler} from './types';

type Props = {
  onUploaded: ProgramFileHandler;
  className?: string;
};

const ProgramFileUploadButton: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(ProgramFileUploadButton);
  const { onUploaded, className } = props;
  const [file, setFile] = React.useState<File>();

  function onFilesChosen(files: FileList | null): void {
    log.debug('files', files);
    setFile(files && files.length === 1 ? files[0] : undefined);
  }

  function handleUpload(programFile: ProgramFileFragment): void {
    setFile(undefined);
    onUploaded(programFile);
  }

  return (
    <Button variant="outlined" className={className} component="label">
      {t('Upload')}
      <input
        type='file'
        hidden
        accept={programPickerAccept}
        onChange={e => onFilesChosen(e.target.files)}
        onClick={(e) => e.currentTarget.value = ''}
      />
      <ProgramFileUploadDialog onUploaded={handleUpload} file={file} setFile={setFile} />
    </Button>
  );
};

export default ProgramFileUploadButton;
