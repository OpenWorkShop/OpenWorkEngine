import * as React from 'react';
import {Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {MachineInstructionResultFragment, ProgramFileFragment} from '../../graphql';
import LogLine from '../Terminal/LogLine';
import {useLogger} from '../../../hooks';
import {PreviewProgramFileDialog, ProgramFileDirectoryCard} from '../../Programs';

const Plans: ToolBase = (props) => {
  const log = useLogger(Plans);
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
    <Grid container >
      {pendingInstructions.map(i => {
        return <LogLine key={i.writeLogEntry.id} logEntry={i.writeLogEntry} />;
      })}
      <Grid item xs={12}>
        <ProgramFileDirectoryCard
          open={selectingFile}
          onClose={() => setSelectingFile(false)}
          onSelected={openProgramFileDialog}
        />
      </Grid>
      <PreviewProgramFileDialog
        workspaceId={workspaceId}
        programFile={selectedProgramFile}
      />
    </Grid>
  );
};

export default Plans;
