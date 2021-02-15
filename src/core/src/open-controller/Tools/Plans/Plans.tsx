import * as React from 'react';
import { Grid } from '@material-ui/core';
import {ToolBase} from '../types';
import ProgramFilePicker from './ProgramFilePicker';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {MachineInstructionResultFragment} from '../../graphql';
import LogLine from '../Terminal/LogLine';

const Plans: ToolBase = (props) => {
  const { workspaceId } = props;
  const pendingInstructions: MachineInstructionResultFragment[] =
    useWorkspaceControllerSelector(workspaceId, c => c.machine.status.buffer.pendingInstructionResults);

  return (
    <Grid container>
      {pendingInstructions.map(i => {
        return <LogLine key={i.writeLogEntry.id} logEntry={i.writeLogEntry} />;
      })}
      <Grid item xs={12}>
        <ProgramFilePicker />
      </Grid>
    </Grid>
  );
};

export default Plans;
