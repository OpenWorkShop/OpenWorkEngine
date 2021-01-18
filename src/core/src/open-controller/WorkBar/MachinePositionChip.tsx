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

export type PositionType = 'work' | 'machine';

type Props = {
  positionType: PositionType;
  position: MachinePositionFragment;
};

const MachinePositionChip: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const classes = useStyles();
  const { positionType, position } = props;
  const isWPos = positionType === 'work';
  const isValid = isMachinePositionValid(position);
  const icon = isWPos ? faMapMarkerAlt : faMapMarkedAlt;
  const tip = isWPos ?
    t('WPos (work position), relative to the work origin (where the program execution will begin).') :
    t('MPos (machine position), in absolute real-world coordinates.');

  const axes: Axis3D[] = [AxisName.X, AxisName.Y, AxisName.Z];
  const positionText = axes
    .map((a) => getMachineAxisPosition(position, a))
    .filter(v => v !== null).join(', ');

  return (<PopoverWorkBarChip faIcon={icon} label={positionText}>
    <Grid item xs={12} className={classes.popoverRowAlt} >
      <HelpfulHeader tip={tip} title={t(isWPos ? 'WPos' : 'MPos')} variant="h6" />
    </Grid>
    <Grid item xs={12} className={classes.popoverRow} >
      {isValid}
    </Grid>
  </PopoverWorkBarChip>);
};

export default MachinePositionChip;
