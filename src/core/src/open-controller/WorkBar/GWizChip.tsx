import {faCube} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import {useTrans} from '../Context';
import {Grid} from '@material-ui/core';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import useStyles from './styles';
import {useLogger} from '../../hooks';
import {AxisPalette, ViewSideSelect} from '../GWiz';

const GWizChip: React.FunctionComponent = () => {
  const log = useLogger(GWizChip);
  const t = useTrans();
  const classes = useStyles();
  const tip = t('The visualizer renders your work in 3D.');

  log.verbose('draw');

  return (
    <PopoverWorkBarChip faIcon={faCube} >
      <Grid item xs={12} className={classes.popoverRowAlt} >
        <HelpfulHeader tip={tip} title={t('Visualizer')} variant="h6" />
      </Grid>
      <Grid item xs={12} className={classes.popoverRow} >
        <ViewSideSelect />
      </Grid>
      <Grid item xs={12} className={classes.popoverRowAlt} >
        <HelpfulHeader tip={t('Change the colors in the visualizer')} title={t('Styles')} variant="h6" />
      </Grid>
      <Grid item xs={12} className={classes.popoverRow} >
        <AxisPalette />
      </Grid>
    </PopoverWorkBarChip>
  );
};

export default GWizChip;
