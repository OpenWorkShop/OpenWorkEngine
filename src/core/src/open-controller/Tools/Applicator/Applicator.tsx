import * as React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {ToolBase} from '../types';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {useLogger} from '../../../hooks';
import useStyles from './styles';
import OverrideControl from './OverrideControl';
import {faArrowCircleLeft, faArrowCircleRight, faArrowsAlt, faStopCircle} from '@fortawesome/free-solid-svg-icons';
import {useTrans} from '../../Context';
import {SpinDirection} from '../../graphql';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

const Applicator: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Applicator);
  const classes = useStyles();
  const { workspaceId } = props;
  const applicator = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.applicator);
  const overrides = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.overrides);

  log.debug('[APPLICATOR]', 'status', status, 'overrides', overrides);

  function getSpinDirectionIcon(spin: SpinDirection): IconDefinition {
    if (spin === SpinDirection.Ccw) return faArrowCircleLeft;
    if (spin === SpinDirection.Cw) return faArrowCircleRight;
    return faStopCircle;
  }

  return (
    <Grid container className={classes.root} >
      <Grid item xs={12}>
        <OverrideControl
          title={t('Feed')}
          icon={faArrowsAlt}
          value={applicator.feedRate}
          override={overrides?.feedAllowed ? overrides.feed : undefined}
        />
      </Grid>
      <Grid item xs={12}>
        <OverrideControl
          title={t('Speed')}
          icon={getSpinDirectionIcon(applicator.spinDirection)}
          value={applicator.spinSpeed}
          override={overrides?.speedAllowed ? overrides.speed : undefined}
        />
      </Grid>
    </Grid>
  );
};

export default Applicator;
