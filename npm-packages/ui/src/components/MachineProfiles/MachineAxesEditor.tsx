import { MachineAxisPropsFragment } from '@openworkshop/lib/api/graphql';
import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { MachineAxes } from '@openworkshop/lib/api/Machines/CustomizedMachine';
import MachineAxisEditor from './MachineAxisEditor';

interface IMachineAxesEditorProps {
  axes: MachineAxes;
  onChanged: (axes: MachineAxes) => void;
}

type GridCellSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

function GetGridCellSize(val: number): GridCellSize {
  if (val >= 12) return 12;
  if (val === 11) return 11;
  if (val === 10) return 10;
  if (val === 9) return 9;
  if (val === 8) return 8;
  if (val === 7) return 7;
  if (val === 6) return 6;
  if (val === 5) return 5;
  if (val === 4) return 4;
  if (val === 3) return 3;
  if (val === 2) return 2;
  return 1;
}

const MachineAxesEditor: React.FunctionComponent<IMachineAxesEditorProps> = (props) => {
  const axisNames = Object.keys(props.axes);
  const size = GetGridCellSize(Math.floor(12 / axisNames.length));
  const axes = props.axes;

  function onChangedAxis(axis: MachineAxisPropsFragment) {
    axes[axis.name] = { ...axis };
    props.onChanged(axes);
  }

  return (
    <Grid container spacing={4} style={{ flexGrow: 1 }}>
      {axisNames.map((axisName) => {
        const axis = axes[axisName];
        return (
          <Grid key={axis.name} item xs={12} sm={6} md={size}>
            <Paper style={{ padding: 20, minWidth: 300 }}>
              <MachineAxisEditor axis={axis} onChanged={onChangedAxis} />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MachineAxesEditor;
