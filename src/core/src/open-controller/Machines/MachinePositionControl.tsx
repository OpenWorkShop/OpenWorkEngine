import {Grid, Typography} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import {MachinePositionFragment} from '../graphql';
import {AxisKey, axisKeys} from './types';
import {useLogger} from '../../hooks';
import NumericInput from '../../components/Forms/NumericInput';
import useStyles from './styles';

type Props = {
  title: string;
  unitsAbbr: string;
  position: MachinePositionFragment;
};

type CellSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

function getCellSize(num: number): CellSize {
  if (num <= 1) return 10;
  if (num === 2) return 5;
  if (num === 3) return 3;
  if (num === 4) return 2;
  return 1;
}

const MachinePositionControl: FunctionComponent<Props> = (props) => {
  const log = useLogger(MachinePositionControl);
  const classes = useStyles();
  const { position, title, unitsAbbr } = props;
  const validAxes = axisKeys.filter(ak => position[ak] !== null);

  if (validAxes.length <= 0) return null;
  log.debug(position, 'axes', validAxes);

  const cellSize = getCellSize(validAxes.length);

  function onChangeAxis(axisKey: AxisKey, value: number) {
    log.debug(axisKey, value);
  }

  return (<Grid container spacing={1}>
    <Grid item xs={2}>
      <Typography variant="h6">{title}</Typography>
    </Grid>
    {validAxes.map(axisKey => {
      return <Grid item key={axisKey} xs={cellSize}>
        <Typography variant="body2" color="textSecondary" style={{ display: 'inline' }}>
          {axisKey.toUpperCase()}:&nbsp;
        </Typography>
        <Typography variant="h6" style={{ display: 'inline' }}>{position[axisKey]}</Typography>

        <NumericInput
          style={{ padding: 0, paddingTop: 2, paddingBottom: 2 }}
          className={classes.positionInput}
          numericValue={position[axisKey]}
          onChangeNumericValue={v => onChangeAxis(axisKey, v)}
        />
      </Grid>;
    })}
  </Grid>);
};

export default MachinePositionControl;
