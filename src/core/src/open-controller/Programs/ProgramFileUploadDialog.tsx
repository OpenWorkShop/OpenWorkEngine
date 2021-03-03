import _ from 'lodash';
import React, {ChangeEvent, FunctionComponent} from 'react';
import {ClientFileUploadInput, useSelectProgramFileMutation, useUploadProgramFileMutation,} from '../graphql';
import {useLogger} from '../../hooks';
import {AlertList, CardDialog, IAlertMessage} from '../../components';
import {useTrans} from '../Context';
import {Button, CircularProgress, FormControl, Grid, MenuItem, Select, TextField} from '@material-ui/core';
import {ProgramFileExtension, programFileExtensions, ProgramFileHandler} from './types';
import useStyles from './styles';

type Props = {
  file?: File;
  setFile: (file?: File) => void;
  onUploaded: ProgramFileHandler;
};

function getProgramFileExtension(fn?: string): ProgramFileExtension | undefined {
  if (!fn) return undefined;
  return fn ? programFileExtensions.find(e => fn.endsWith(`.${e}`)) : undefined;
}

const ProgramFileUploadDialog: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(ProgramFileUploadDialog);
  const classes = useStyles();
  const { onUploaded, file, setFile } = props;

  const open = Boolean(file);
  const pickedFileName = file?.name ?? '';
  const programExtension = getProgramFileExtension(pickedFileName);

  const defaultFilename = programExtension && pickedFileName.endsWith(programExtension) ?
    pickedFileName.substring(0, pickedFileName.length - programExtension.length - 1) : pickedFileName;
  const [filename, setFilename] = React.useState(defaultFilename);
  const [error, setError] = React.useState<IAlertMessage>();
  const [extension, setExtension] = React.useState(programExtension);
  const [select, selected ] = useSelectProgramFileMutation();
  const [upload, uploaded ] = useUploadProgramFileMutation();
  const [fileExistMap, setFileExistMap] = React.useState<{ [key: string]: boolean }>({});
  const [filesTested, setFilesTested] = React.useState<string[]>([]);

  const meta = selected.data?.programFileMeta;
  const fullFilename = filename && extension ? `${filename}.${extension}` : filename;
  const hasCheckedFileExists = _.has(fileExistMap, fullFilename);
  const fileExists = hasCheckedFileExists && fileExistMap[fullFilename];
  const isLoading = Boolean(uploaded.loading || selected.loading);
  const canUpload = hasCheckedFileExists && !uploaded.loading;

  function onClose() {
    setFile(undefined);
  }

  function getClientUpload(file: File, name?: string): ClientFileUploadInput {
    const {type, size, lastModified} = file;
    if (name && extension) name = `${name}.${extension}`;
    else if (!name) name = file.name;
    return {type, size, lastModified, name} as ClientFileUploadInput;
  }

  async function selectFile(file: File, name?: string): Promise<void> {
    try {
      setError(undefined);
      if (!filesTested.includes(file.name))  setFilesTested([...filesTested, name ?? file.name]);
      const variables = {fileUpload: getClientUpload(file, name)};
      await select({variables});
    } catch (e) {
      setError(e);
    }
  }

  React.useEffect(() => {
    if (meta && fileExistMap[meta.name] !== meta.fileExists) {
      setFileExistMap({ ...fileExistMap, [meta.name]: meta.fileExists });
    }
  }, [meta, fileExistMap]);

  async function uploadFile(file: File, name: string): Promise<void> {
    try {
      setError(undefined);
      const text = await file.text();
      const variables = {fileUpload: { ...getClientUpload(file, name), text}};
      const res = await upload({variables});
      const programFile = res.data?.programFile;
      if (!programFile) throw new Error('Failed to receive program file.');
      onUploaded(programFile);
    } catch (e) {
      setError(e);
    }
  }

  function onChangeFilename(ce: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    const fn = ce.currentTarget.value;
    setFilename(fn);
    if (file && !filesTested.includes(fn)) void selectFile(file, fn);
  }

  // File change -> ask server about file.
  React.useEffect(() => {
    if (file) {
      setFilename(defaultFilename);
      setExtension(getProgramFileExtension(file.name));
      void selectFile(file);
    }
  }, [file]);

  log.debug('files', filename, defaultFilename, programExtension, fileExistMap, meta);

  return (
    <CardDialog
      open={open}
      onClose={onClose}
      title={t('Upload Gcode Program')}
      footer={<FormControl>
        {file && (
          <Button
            variant="contained"
            color={fileExists ? 'secondary' : 'primary'}
            disabled={!canUpload}
            onClick={() => uploadFile(file, filename)}
          >
            {isLoading && <CircularProgress size={24} />}
            &nbsp;
            {t(fileExists ? 'Overwrite Existing File' : 'Save New File')}
          </Button>
        )}
      </FormControl>}
    >
      <Grid container spacing={1} className={classes.dialogContent} >
        <Grid item xs={9}>
          <FormControl
            margin='normal'
            fullWidth={true}
            variant='outlined'
          >
            <TextField
              label={t('File Name')}
              value={filename}
              autoFocus={true}
              onChange={onChangeFilename}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl margin='normal' fullWidth={true} variant="outlined" >
            <Select
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
            >
              {programFileExtensions.map(ext => {
                return (
                  <MenuItem key={ext} value={ext}>.{ext}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <AlertList error={error} />
    </CardDialog>
  );
};

export default ProgramFileUploadDialog;
