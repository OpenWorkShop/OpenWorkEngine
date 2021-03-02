import React from 'react';
import {ToolBase} from '../types';
import {Button, FormControl, Grid} from '@material-ui/core';
import Jogger from './Jogger';
import {useLogger} from '../../../hooks';
import useStyles from './styles';
import {useTrans} from '../../Context';
import {faArrowCircleLeft, faArrowCircleRight, faBullseye, faStopCircle} from '@fortawesome/free-solid-svg-icons';
import {CircleDirection} from '../../graphql';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCreativeCommonsZero} from '@fortawesome/free-brands-svg-icons';
import {CalibrationDialog} from '../../Calibration';

const Controls: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Controls);
  const classes = useStyles();
  const { tool, workspaceId } = props;
  const [ calibrating, setCalibrating ] = React.useState(false);

  log.debug('render', tool, workspaceId);

  function getSpinDirectionIcon(spin: CircleDirection): IconDefinition {
    if (spin === CircleDirection.Ccw) return faArrowCircleLeft;
    if (spin === CircleDirection.Cw) return faArrowCircleRight;
    return faStopCircle;
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <Jogger tool={tool} workspaceId={workspaceId} />
    </Grid>
    <Grid item xs={6} className={classes.footer} >
      <FormControl fullWidth={true}>
        <Button
          variant="outlined"
          className={classes.buttonLeft}
          onClick={() => setCalibrating(true)}
        >
          <FontAwesomeIcon icon={faBullseye} className={classes.buttonIcon} />
          Calibrate
        </Button>
      </FormControl>
    </Grid>
    <Grid item xs={6} className={classes.footer} >
      <FormControl fullWidth={true} >
        <Button
          variant="outlined"
          className={classes.buttonRight}
        >
          <FontAwesomeIcon icon={faCreativeCommonsZero} className={classes.buttonIcon} />
          Zero
        </Button>
      </FormControl>
    </Grid>
    <CalibrationDialog
      workspaceId={workspaceId}
      open={calibrating}
      onClose={() => setCalibrating(false)}
    />
  </Grid>;
};

export default Controls;
