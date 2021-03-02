import * as React from 'react';
import {Button, FormControl, Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {MachineInstructionResultFragment, ProgramFileFragment} from '../../graphql';
import LogLine from '../Terminal/LogLine';
import {useLogger} from '../../../hooks';
import PreviewProgramFileDialog from '../../Programs/PreviewProgramFileDialog';
import {useTrans} from '../../Context';
import useStyles from '../../Programs/styles';
import ProgramDirectoryDialog from '../../Programs/ProgramDirectoryDialog';

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
    setSelectingFile(false);
    setSelectedProgramFile(programFile);
  }

  return (
    <Grid container spacing={1}>
      {pendingInstructions.map(i => {
        return <LogLine key={i.writeLogEntry.id} logEntry={i.writeLogEntry} />;
      })}
      <Grid item xs={12} className={classes.footer}>
        <FormControl fullWidth={true} >
          <Button
            variant="outlined"
            onClick={() => setSelectingFile(true)}
          >
            {t('Open Gcode Program')}
          </Button>
        </FormControl>
      </Grid>
      <ProgramDirectoryDialog
        open={selectingFile}
        onClose={() => setSelectingFile(false)}
        onSelected={openProgramFileDialog}
      />
      <PreviewProgramFileDialog
        workspaceId={workspaceId}
        programFile={selectedProgramFile}
      />
    </Grid>
  );
};

export default Plans;
