import * as React from 'react';
import _ from 'lodash';
import {Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import {IMoveRequest} from './types';
import JogButton from './JogButton';
import useStyles from './styles';
import JogStepSelect from './JogStepSelect';
import {useTrans} from '../../Context';
import {useWorkspaceControllerSelector, useWorkspaceSelector, useWorkspaceUnits} from '../../Workspaces';
import {getMachineAxisJogSteps} from '../../Machines';
import {
  AxisName,
  MachineMotionType, MachineOverridesMode, MachineSettingUnits,
  MoveCommandInput,
  MovementDistanceType,
  UnitType,
  useMoveMachineMutation
} from '../../graphql';
import {useLogger} from '../../../hooks';
import OverrideControl from './OverrideControl';
import {useControllerCommand} from '../../Controllers/hooks';
import AnyIcon from '../../../components/AnyIcon';

const Jogger: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Jogger);
  const classes = useStyles();
  const { workspaceId } = props;
  const units = useWorkspaceUnits(workspaceId);
  const axes = useWorkspaceSelector(workspaceId, ws => ws.settings.axes);
  const zAxis = _.find(axes, a => a.name === AxisName.Z);
  const xyAxis = _.find(axes, a => a.name === AxisName.X) ||
    _.find(axes, a => a.name === AxisName.Y);
  const jogOpts = { units };
  const [zSteps, setZSteps] = React.useState<number[]>(zAxis ? getMachineAxisJogSteps(zAxis, jogOpts) : []);
  const [xySteps, setXYSteps] = React.useState<number[]>(xyAxis ? getMachineAxisJogSteps(xyAxis, jogOpts) : []);
  const [xyStep, setXyStep] = React.useState<number>(1);
  const [zStep, setZStep] = React.useState<number>(1);
  const isEnabled = useWorkspaceControllerSelector(workspaceId, c => c.canReceiveCommands);
  const applicator = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.applicator);
  const overrides = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.overrides);
  const [moveMachine] = useControllerCommand(workspaceId, useMoveMachineMutation());

  React.useEffect(() => {
    if (zAxis) {
      const zs = getMachineAxisJogSteps(zAxis, { units });
      setZSteps(zs);
      if (!zs.includes(zStep)) setZStep(zs[0]);
    }
    if (xyAxis) {
      const xys = getMachineAxisJogSteps(xyAxis,  { units });
      setXYSteps(xys);
      if (!xys.includes(xyStep)) setXyStep(xys[0]);
    }
    log.debug(zAxis, xyAxis, units);
  }, [zAxis, xyAxis, units]);

  log.debug('draw', zSteps, xySteps);

  const reqs: IMoveRequest[] = [
    { distanceType: MovementDistanceType.Relative, x: -xyStep, y: xyStep },
    { distanceType: MovementDistanceType.Relative, x: 0, y: xyStep },
    { distanceType: MovementDistanceType.Relative, x: xyStep, y: xyStep },
    { distanceType: MovementDistanceType.Relative, z: zStep },
    { distanceType: MovementDistanceType.Relative, x: -xyStep, y: 0 },
    { distanceType: MovementDistanceType.Absolute, x: 0, y: 0 },
    { distanceType: MovementDistanceType.Relative, x: xyStep, y: 0 },
    { distanceType: MovementDistanceType.Absolute, z: 0 },
    { distanceType: MovementDistanceType.Relative, x: -xyStep, y: -xyStep },
    { distanceType: MovementDistanceType.Relative, x: 0, y: -xyStep },
    { distanceType: MovementDistanceType.Relative, x: xyStep, y: -xyStep },
    { distanceType: MovementDistanceType.Relative, z: -zStep },
  ];

  function undefinedToNull<T>(v: T | null | undefined): T | null {
    return v === undefined ? null : v;
  }

  async function move(req: IMoveRequest): Promise<void> {
    const moveCommand: MoveCommandInput = {
      x: undefinedToNull(req.x),
      y: undefinedToNull(req.y),
      z: undefinedToNull(req.z),
      a: undefinedToNull(req.a),
      b: undefinedToNull(req.b),
      c: undefinedToNull(req.c),
      u: undefinedToNull(req.u),
      v: undefinedToNull(req.v),
      w: undefinedToNull(req.w),
      motionType: req.motionType || MachineMotionType.Rapid,
      distanceType: req.distanceType,
    };
    log.debug('move', Object.keys(req), moveCommand);
    await moveMachine({ variables: { workspaceId, moveCommand }});
  }

  function renderJogButtonCell(req: IMoveRequest) {
    return <Grid key={reqs.indexOf(req)} item xs={3}>
      <JogButton moveRequest={req} move={move} disabled={!isEnabled} />
    </Grid>;
  }

  return (
    <Grid container spacing={1} className={classes.jogger} >
      <Grid item xs={6}>
        <JogStepSelect
          title={t('X/Y Axis Step')}
          units={units}
          stepValue={xyStep}
          setStepValue={setXyStep}
          steps={xySteps}
        />
      </Grid>
      <Grid item xs={6}>
        <JogStepSelect
          title={t('Z Axis Step')}
          units={units}
          stepValue={zStep}
          setStepValue={setZStep}
          steps={zSteps}
        />
      </Grid>
      {reqs.map((req) => {
        return renderJogButtonCell(req);
      })}
      <Grid item xs={6}>
        <OverrideControl
          title={t('Feed')}
          disabled={!isEnabled}
          className={classes.override}
          units={MachineSettingUnits.MillimetersPerMinute}
          value={applicator.feedRate.data}
          override={[MachineOverridesMode.All, MachineOverridesMode.Feeds].includes(overrides?.mode.data) ?
            overrides.feed.data : undefined}
        />
      </Grid>
      <Grid item xs={6}>
        <OverrideControl
          title={t('Speed')}
          disabled={!isEnabled}
          className={classes.override}
          units={MachineSettingUnits.Rpm}
          value={applicator.spinSpeed.data}
          override={[MachineOverridesMode.All, MachineOverridesMode.Speeds].includes(overrides?.mode.data) ?
            overrides.speed.data : undefined}
        />
      </Grid>
    </Grid>
  );
};

export default Jogger;
