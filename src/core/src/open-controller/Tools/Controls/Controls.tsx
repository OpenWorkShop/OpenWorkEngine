import React from 'react';
import {ToolBase} from '../types';
import {Grid} from '@material-ui/core';
import Jogger from './Jogger';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {useLogger} from '../../../hooks';
import useStyles from './styles';
import {useTrans} from '../../Context';
import OverrideControl from './OverrideControl';
import {faArrowCircleLeft, faArrowCircleRight, faStopCircle} from '@fortawesome/free-solid-svg-icons';
import {MachineSettingUnits, SpinDirection} from '../../graphql';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

const Controls: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Controls);
  const classes = useStyles();
  const { tool, workspaceId } = props;
  const applicator = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.applicator);
  const overrides = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.overrides);

  log.debug('render', tool, workspaceId);
  function getSpinDirectionIcon(spin: SpinDirection): IconDefinition {
    if (spin === SpinDirection.Ccw) return faArrowCircleLeft;
    if (spin === SpinDirection.Cw) return faArrowCircleRight;
    return faStopCircle;
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <Jogger tool={tool} workspaceId={workspaceId} />
    </Grid>
    <Grid item xs={6} className={classes.dialogFooter}>
      <OverrideControl
        title={t('Feed')}
        units={MachineSettingUnits.MillimetersPerMinute}
        value={applicator.feedRate}
        override={overrides?.feedAllowed ? overrides.feed : undefined}
      />
    </Grid>
    <Grid item xs={6} className={classes.dialogFooter}>
      <OverrideControl
        title={t('Speed')}
        units={MachineSettingUnits.Rpm}
        value={applicator.spinSpeed}
        override={overrides?.speedAllowed ? overrides.speed : undefined}
      />
    </Grid>
  </Grid>;
};

export default Controls;
