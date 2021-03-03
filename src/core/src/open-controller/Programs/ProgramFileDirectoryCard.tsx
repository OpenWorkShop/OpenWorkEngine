import React, { FunctionComponent } from 'react';
import {AlertList, HelpfulHeader, IAlertMessage, CardDialog, ToolbarCard, CardWidget} from '../../components';
import {Button, FormControl, Paper, Typography} from '@material-ui/core';
import {useTrans} from '../Context';
import ProgramFileUploadButton from './ProgramFileUploadButton';
import ProgramFileTree from './ProgramFileTree';
import {useDispatch, useSelector} from 'react-redux';
import useStyles from './styles';
import {
  ProgramFileDirectoryFragment,
  ProgramFileMetaFragment,
  useLoadProgramMutation,
  useProgramDirectoryQuery
} from '../graphql';
import {AppState} from '../redux';
import programsSlice from './slice';
import {ProgramFileHandler} from './types';

type Props = {
  open?: boolean;
  onClose?: () => void;
  onSelected: ProgramFileHandler;
};

const ProgramFileDirectoryCard: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const {  onSelected } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const loadDirectory = useProgramDirectoryQuery();
  const [loadProgram, loadedProgram] = useLoadProgramMutation();
  const [error, setError] = React.useState<IAlertMessage>();
  const directory = useSelector<AppState, ProgramFileDirectoryFragment>(s => s.programs.directory);
  const [selectedMetaRev, setSelectedMetaRev] = React.useState<[ProgramFileMetaFragment, number]>();

  const programFileMetas = directory.programFileMetas;
  const selectedMeta = (selectedMetaRev ? selectedMetaRev[0] : undefined);
  const selectedRevisions = selectedMeta?.data?.revisions ?? [];
  const lastRevision = selectedRevisions.length > 0 ? selectedRevisions[selectedRevisions.length - 1] : undefined;
  const selectedRevision = selectedMetaRev && selectedMetaRev[1] && lastRevision?.id !== selectedMetaRev[1] ?
    selectedMetaRev[1] : 0;
  const hasSelectedRevision = selectedRevision > 0;
  const hasFiles = programFileMetas.length > 0;
  const isLoading = loadedProgram.loading;
  const isDisabled = isLoading;

  React.useEffect(() => {
    const loadedDirectory = loadDirectory.data?.programFileDirectory;
    if (loadedDirectory) dispatch(programsSlice.actions.setProgramDirectory(loadedDirectory));
  }, [loadDirectory]);

  async function onClickedLoad() {
    if (!selectedMetaRev) return;
    try {
      const variables = {name: selectedMetaRev[0].name};
      const res = await loadProgram({variables});

      const programFile = res.data?.programFile;
      if (programFile) {
        dispatch(programsSlice.actions.updateProgramMeta(programFile.meta));
        onSelected(programFile);
        setSelectedMetaRev(undefined);
      }
    } catch (e) {
      setError(e);
    }
  }

  function onSelectedFileMeta(meta?: ProgramFileMetaFragment, revId?: number) {
    if (meta) {
      setSelectedMetaRev([meta, revId ?? 0]);
    } else {
      setSelectedMetaRev(undefined);
    }
  }

  const footer = (
    <FormControl fullWidth={true} >
      {!selectedMetaRev && <ProgramFileUploadButton onUploaded={onSelected} />}
      {selectedMetaRev && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickedLoad()}
          disabled={isDisabled}
        >
          {hasSelectedRevision && t('View Changes in Revision #{{ rev }}', { rev: selectedRevision })}
          {!hasSelectedRevision && t('Open Program File')}
        </Button>
      )}
    </FormControl>
  );

  return (
    <CardWidget
      title={t('Gcode Programs')}
      footer={footer}
    >
      <AlertList error={error} />
      <div className={classes.dialogContent}>
        <HelpfulHeader
          variant="subtitle2"
          title={directory.path}
          tip={t('This is the folder where the Gcode programs are stored. ' +
            'You can import directly from your computer into this folder, below.')}
        />
      </div>
      <Paper>
        {hasFiles && <ProgramFileTree onSelected={onSelectedFileMeta} programFileMetas={programFileMetas} />}
        {!hasFiles && <div className={classes.dialogContent}>
          <Typography variant="h5">{t('No Program Files Found')}</Typography>
          <Typography variant="body1">
            {t('Import a file, below, or place it in the above folder.')}
          </Typography>
        </div>}
      </Paper>
    </CardWidget>
  );
};

export default ProgramFileDirectoryCard;
