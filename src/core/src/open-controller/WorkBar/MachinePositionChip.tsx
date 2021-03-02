import * as React from 'react';
import {faMapMarkedAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {useTrans} from '../Context';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import {Grid} from '@material-ui/core';
import useStyles from './styles';
import {getMachineAxisPosition, MachinePositionControl} from '../Machines';
import {IHaveWorkspace, useWorkspaceControllerSelector, useWorkspaceSelector, useWorkspaceUnits,} from '../Workspaces';
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

  const positionText = axes
    .map((a) => getMachineAxisPosition(mPos, a, units))
    .filter(v => v !== null)
    .join(', ') + ' ' + unitsStr;

  return (<PopoverWorkBarChip faIcon={icon} label={positionText}>
    <Grid item xs={12} className={classes.popoverRow} >
      <MachinePositionControl title={t('MPos')} unitsAbbr={unitsStr} position={mPos} />
    </Grid>
    {wPos && <Grid item xs={12} className={classes.popoverRow} >
      <MachinePositionControl title={t('WPos')} unitsAbbr={unitsStr} position={wPos} />
    </Grid>}
  </PopoverWorkBarChip>);
};

export default MachinePositionChip;
