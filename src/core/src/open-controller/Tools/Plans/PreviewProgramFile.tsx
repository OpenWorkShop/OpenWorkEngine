import React, { FunctionComponent } from 'react';
import {IHaveProgramFile} from './types';
import {Grid} from '@material-ui/core';
import {IHaveWorkspace} from '../../Workspaces';

type Props = IHaveWorkspace & IHaveProgramFile;

const PreviewProgramFile: FunctionComponent<Props> = (props) => {
  const { programFile, workspaceId } = props;
  const { meta, lineCount, instructionCount } = programFile;
  const { directory, name, size, syntax, lastModified } = meta;

  return (
    <Grid container >
      <Grid item xs={12}>
        {name}
      </Grid>
      <Grid item xs={8}>
        Lines
      </Grid>
      <Grid item xs={4}>
        {lineCount}
      </Grid>
      <Grid item xs={8}>
        Instructions
      </Grid>
      <Grid item xs={4}>
        {instructionCount}
      </Grid>
    </Grid>
  );
};

export default PreviewProgramFile;
