import React, { FunctionComponent } from 'react';
import {FormControlLabel, Grid, Typography, useTheme} from '@material-ui/core';
import {useLogger} from '../../../Hooks';
import {IMaterial, IVisualizerStyles} from '../types';
import {AppState} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import {WorkspaceAxisMap} from '../../Workspaces';
import {gWizSetAxisMaterial} from '../actions';
import MaterialPicker from './MaterialPicker';
import {defaultAxisMaterialParams} from '../GWizAxes';
import {useTrans} from '../../Context';
import HelpfulExponent from '../../../components/Text/HelpfulExponent';
import {IMachineAxis} from '../../Machines';

const AxisPalette: FunctionComponent = () => {
  const t = useTrans();
  const log = useLogger(AxisPalette);
  const theme = useTheme();

  const dispatch = useDispatch();
  const axes = useSelector<AppState, WorkspaceAxisMap>(s => s.gWiz.visualizerPreferences.axes);
  const styles = useSelector<AppState, IVisualizerStyles>(s => s.gWiz.visualizerPreferences.styles);

  function setAxisMaterial(axisName: string, material: IMaterial) {
    log.debug('[AXIS]', axisName, 'material', material);
    dispatch(gWizSetAxisMaterial({ axisName, material }));
    // setAxisMaterial(axis, { color: `#${color.hex}` });
  }

  function renderAxisItem(axisName: string, axisTitle: string, size: 4 | 6 | 12, tip?: string) {
    const mat: IMaterial = styles.axes[axisName] ?? defaultAxisMaterialParams;
    return (
      <Grid key={`${axisTitle}`} item xs={size} >
        <FormControlLabel
          style={{ marginLeft: 0 }}
          control={<MaterialPicker materialParameters={mat} onChange={m => setAxisMaterial(axisName, m)} />}
          label={
            <Typography
              variant="h6"
              style={{ marginLeft: theme.spacing(1), marginBottom: theme.spacing(0.5), }}
            >
              {axisTitle}
              {tip && <HelpfulExponent tip={tip} />}
            </Typography>
          }
        />
      </Grid>
    );
  }

  log.verbose('draw', axes, styles);

  return (
    <Grid container >
      {renderAxisItem('E', 'Extruder / End-Mill', 12, t('Depicts where the machine is currently located.'))}
      {renderAxisItem('H', 'History', 6, t('The paths in the program which have already been executed.'))}
      {renderAxisItem('P', 'Plan', 6, t('Those paths not yet executed from the program.'))}
      {Object.values(axes).map((a: IMachineAxis) => {
        return renderAxisItem(a.name, a.name, 4);
      })}
    </Grid>
  );
};

export default AxisPalette;
