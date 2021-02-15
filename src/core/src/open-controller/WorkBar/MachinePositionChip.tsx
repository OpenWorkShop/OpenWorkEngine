import * as React from 'react';
import {AxisName, MachinePositionFragment} from '../graphql';
import {faMapMarkedAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {useTrans} from '../Context';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import {Grid} from '@material-ui/core';
import useStyles from './styles';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import {getMachineAxisPosition, isMachinePositionValid} from '../Machines/MachinePosition';
import {Axis3D} from '../Machines';
import {
  convertUnits,
  IHaveWorkspace,
  useWorkspaceControllerSelector,
  useWorkspaceSelector,
  useWorkspaceUnits
} from '../Workspaces';
import {useSelector} from 'react-redux';
import {getDistanceUnitAbbreviationKey} from '../../components/Units';

export type PositionType = 'work' | 'machine';

type Props = IHaveWorkspace;

const MachinePositionChip: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const classes = useStyles();
  const { workspaceId } = props;
  const machineStatus = useWorkspaceControllerSelector(workspaceId, c => c.machine.status );
  const axes = useWorkspaceSelector(workspaceId, ws => ws.settings.axes);
  const units = useWorkspaceUnits(workspaceId);
  const unitsStr = t(getDistanceUnitAbbreviationKey(units, false));

  const mPos = machineStatus.machinePosition;
  const wPos = machineStatus.workPosition;

  const isWPos = !Boolean(wPos);
  const icon = isWPos ? faMapMarkedAlt : faMapMarkerAlt;
  const tip = isWPos ?
    t('WPos (work position), relative to the work origin (where the program execution will begin).') :
    t('MPos (machine position), in absolute real-world coordinates.');

  const positionText = axes
    .map((a) => getMachineAxisPosition(mPos, a, units))
    .filter(v => v !== null)
    .join(', ') + ' ' + unitsStr;

  return (<PopoverWorkBarChip faIcon={icon} label={positionText}>
    <Grid item xs={12} className={classes.popoverRowAlt} >
      <HelpfulHeader tip={tip} title={t('Machine Position')} variant="h6" />
    </Grid>
    <Grid item xs={12} className={classes.popoverRow} >
    </Grid>
    <Grid item xs={12} className={classes.popoverRowAlt} >
      <HelpfulHeader tip={tip} title={t('WPos')} variant="h6" />
    </Grid>
    <Grid item xs={12} className={classes.popoverRow} >
      Modal Groups ...
    </Grid>
  </PopoverWorkBarChip>);
};

export default MachinePositionChip;
