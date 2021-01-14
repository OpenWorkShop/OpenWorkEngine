import * as React from 'react';
import _ from 'lodash';
import {Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import {IMoveRequest} from './types';
import JogButton from './JogButton';
import useStyles from './Styles';
import JogStepSelect from './JogStepSelect';
import {useTrans} from '../../Context';
import {useWorkspaceSelector, useWorkspaceUnits} from '../../Workspaces';
import {getMachineAxisJogSteps} from '../../Machines';
import {AxisName, UnitType} from '../../graphql';

const AxisJoggerPad: ToolBase = (props) => {
  const t = useTrans();
  const classes = useStyles();
  const { workspaceId } = props;
  const units = useWorkspaceUnits(workspaceId);
  const jogOpts = { imperialUnits: units === UnitType.Imperial };
  const axes = useWorkspaceSelector(workspaceId, ws => ws.settings.axes);
  const zAxis = _.find(axes, a => a.name === AxisName.Z);
  const xyAxis = _.find(axes, a => a.name === AxisName.X) ||
    _.find(axes, a => a.name === AxisName.Y);
  const [xyStep, setXyStep] = React.useState<number>(1);
  const [zStep, setZStep] = React.useState<number>(1);
  const zSteps = zAxis ? getMachineAxisJogSteps(zAxis, jogOpts) : [];
  const xySteps = xyAxis ? getMachineAxisJogSteps(xyAxis, jogOpts) : [];

  const reqs: IMoveRequest[] = [
    { xAxis: -xyStep, yAxis: xyStep },
    { xAxis: 0, yAxis: xyStep },
    { xAxis: xyStep, yAxis: xyStep },
    { zAxis: zStep },
    { xAxis: -xyStep, yAxis: 0 },
    { type: 'absolute', xAxis: 0, yAxis: 0 },
    { xAxis: xyStep, yAxis: 0 },
    { type: 'absolute', zAxis: 0 },
    { xAxis: -xyStep, yAxis: -xyStep },
    { xAxis: 0, yAxis: -xyStep },
    { xAxis: xyStep, yAxis: -xyStep },
    { zAxis: -zStep },
  ];

  function renderJogButtonCell(req: IMoveRequest) {
    return <Grid key={reqs.indexOf(req)} item xs={3}><JogButton {...req} /></Grid>;
  }

  return (
    <Grid container spacing={1} className={classes.root} >
      <Grid item xs={6}>
        <JogStepSelect
          title={t('X/Y Axis Step')}
          stepValue={xyStep}
          setStepValue={setXyStep}
          steps={xySteps}
        />
      </Grid>
      <Grid item xs={6}>
        <JogStepSelect
          title={t('Z Axis Step')}
          stepValue={zStep}
          setStepValue={setZStep}
          steps={zSteps}
        />
      </Grid>
      {reqs.map((req) => {
        return renderJogButtonCell(req);
      })}
    </Grid>
  );
};

export default AxisJoggerPad;
