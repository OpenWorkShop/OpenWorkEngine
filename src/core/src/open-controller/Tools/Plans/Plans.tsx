import * as React from 'react';
import {Button, FormControl, Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import ProgramFileUploadButton from './ProgramFileUploadButton';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {MachineInstructionResultFragment, ProgramFileFragment} from '../../graphql';
import LogLine from '../Terminal/LogLine';
import {useLogger} from '../../../hooks';
import SimpleDialog from '../../../components/Dialogs/SimpleDialog';
import PreviewProgramFile from './PreviewProgramFile';
import {useTrans} from '../../Context';
import ProgramFileListMenu from './ProgramFileListMenu';
import useStyles from './styles';

const Plans: ToolBase = (props) => {
  const log = useLogger(Plans);
  const t = useTrans();
  const classes = useStyles();
  const { workspaceId } = props;
  const pendingInstructions: MachineInstructionResultFragment[] =
    useWorkspaceControllerSelector(workspaceId, c => c.machine.status.buffer.pendingInstructionResults);
  const [selectingFile, setSelectingFile] = React.useState(false);
  const [selectedProgramFile, setSelectedProgramFile] = React.useState<ProgramFileFragment>();

  function openProgramFileDialog(programFile: ProgramFileFragment): void {
    log.debug('open program file dialog', programFile);
    setSelectedProgramFile(programFile);
  }

  return (
    <Grid container spacing={1}>
      {pendingInstructions.map(i => {
        return <LogLine key={i.writeLogEntry.id} logEntry={i.writeLogEntry} />;
      })}
      <Grid item xs={6} className={classes.footer}>
        <FormControl fullWidth={true} >
          <Button
            variant="outlined"
            className={classes.buttonLeft}
            onClick={() => setSelectingFile(true)}
          >
            {t('Browse')}
          </Button>
        </FormControl>
      </Grid>
      <Grid item xs={6} className={classes.footer}>
        <FormControl fullWidth={true} >
          <ProgramFileUploadButton className={classes.buttonRight} onUploaded={openProgramFileDialog} />
        </FormControl>
      </Grid>
      <SimpleDialog
        title={t('Select File')}
        open={selectingFile}
        onClose={() => setSelectingFile(false)}
      >
        {selectedProgramFile && <ProgramFileListMenu onLoaded={openProgramFileDialog} />}
      </SimpleDialog>
      <SimpleDialog
        title={t('Gcode')}
        open={Boolean(selectedProgramFile)}
        onClose={() => setSelectedProgramFile(undefined)}
      >
        {selectedProgramFile && <PreviewProgramFile workspaceId={workspaceId} programFile={selectedProgramFile} />}
      </SimpleDialog>
    </Grid>
  );
};

export default Plans;
