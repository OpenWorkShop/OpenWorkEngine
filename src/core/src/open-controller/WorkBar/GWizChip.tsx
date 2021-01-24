import {faCube} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import {ViewPlane} from '../GWiz';
import {useTrans} from '../Context';
import {getViewPlaneNameKey} from '../GWiz/ViewPlane';
import {Grid} from '@material-ui/core';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import useStyles from './styles';
import {useLogger} from '../../hooks';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';
import ViewModeSelect from '../GWiz/Preferences/ViewModeSelect';
import AxisPalette from '../GWiz/Preferences/AxisPalette';

const GWizChip: React.FunctionComponent = () => {
  const log = useLogger(GWizChip);
  const t = useTrans();
  const classes = useStyles();
  const viewPlane = useSelector<AppState, ViewPlane>(s => s.gWiz.visualizerPreferences.viewPlane);
  const tip = t('The visualizer renders your work in 3D.');

  log.verbose('draw');

  return (
    <PopoverWorkBarChip label={t(getViewPlaneNameKey(viewPlane))} faIcon={faCube} >
      <Grid item xs={12} className={classes.popoverRowAlt} >
        <HelpfulHeader tip={tip} title={t('Visualizer')} variant="h6" />
      </Grid>
      <Grid item xs={12} className={classes.popoverRow} >
        <ViewModeSelect />
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
