import * as React from 'react';
import { Grid } from '@material-ui/core';
import {ToolBase} from '../types';
import ProgramFilePicker from './ProgramFilePicker';

const Plans: ToolBase = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ProgramFilePicker />
      </Grid>
    </Grid>
  );
};

export default Plans;
