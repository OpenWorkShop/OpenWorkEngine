import * as React from 'react';
import _ from 'lodash';
import {Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import {IMoveRequest} from './types';
import JogButton from './JogButton';
import useStyles from './styles';
import JogStepSelect from './JogStepSelect';
import {useTrans} from '../../Context';
import {useWorkspaceSelector, useWorkspaceUnits} from '../../Workspaces';
import {getMachineAxisJogSteps} from '../../Machines';
import {
  AxisName,
  MachineMotionType,
  MoveCommandInput,
  MovementDistanceType,
  UnitType,
  useMoveMachineMutation
} from '../../graphql';
import {useLogger} from '../../../hooks';

const Jogger: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Jogger);
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
  const [moveMachine] = useMoveMachineMutation();

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
    try {
      const moveCommand: MoveCommandInput = {
        x: undefinedToNull(req.x),
        y: undefinedToNull(req.y),
        z: undefinedToNull(req.z),
        a: undefinedToNull(req.a),
        b: undefinedToNull(req.b),
        c: undefinedToNull(req.c),
        motionType: req.motionType || MachineMotionType.Rapid,
        distanceType: req.distanceType,
      };
      log.debug('move', Object.keys(req), moveCommand);
      await moveMachine({ variables: { workspaceId, moveCommand }});
    } catch (e) {
      log.error(e);
    }
  }

  function renderJogButtonCell(req: IMoveRequest) {
    return <Grid key={reqs.indexOf(req)} item xs={3}>
      <JogButton moveRequest={req} move={move} />
    </Grid>;
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

export default Jogger;
