import React, {FunctionComponent} from 'react';
import {FormControlLabel, Grid, Typography, useTheme} from '@material-ui/core';
import {useLogger} from '../../../hooks';
import {IMaterial, IVisualizerStyles, RenderGroupType} from '../types';
import {AppState} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import MaterialPicker from './MaterialPicker';
import {defaultAxisMaterialParams} from '../Visualizer/GWizAxes';
import {useTrans} from '../../Context';
import HelpfulExponent from '../../../components/Text/HelpfulExponent';
import gWizSlice from '../GWizSlice';

type MaterialMap = { [key: string]: IMaterial };

const AxisPalette: FunctionComponent = () => {
  const t = useTrans();
  const log = useLogger(AxisPalette);
  const theme = useTheme();

  const dispatch = useDispatch();
  const axes = useSelector<AppState, MaterialMap>(s => s.gWiz.visualizerPreferences.styles.renderGroups);
  const styles = useSelector<AppState, IVisualizerStyles>(s => s.gWiz.visualizerPreferences.styles);

  function getRenderGroupTitle(rg: RenderGroupType): string {
    if (rg === RenderGroupType.E) return t('Extruder / End-Mill');
    if (rg === RenderGroupType.H) return t('History');
    if (rg === RenderGroupType.P) return t('Plan');
    if (rg === RenderGroupType.X) return t('X');
    if (rg === RenderGroupType.Y) return t('Y');
    if (rg === RenderGroupType.Z) return t('Z');
    return rg.toString();
  }

  function renderGroup(rg: RenderGroupType, size: 4 | 6 | 12, tip?: string) {
    const rgName = rg.toString();
    const rgTitle = getRenderGroupTitle(rg);
    const mat: IMaterial = styles.renderGroups[rgName] ?? defaultAxisMaterialParams;
    return (
      <Grid key={`${rgTitle}`} item xs={size} >
        <FormControlLabel
          style={{ marginLeft: 0 }}
          control={<MaterialPicker
            materialParameters={mat}
            onChange={ (material) => {
              dispatch(gWizSlice.actions.setRenderGroupMaterial({key: rg, material}));
            }}
          />}
          label={
            <Typography
              variant="h6"
              style={{ marginLeft: theme.spacing(1), marginBottom: theme.spacing(0.5), }}
            >
              {rgTitle}
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
      {renderGroup(RenderGroupType.E, 12, t('Depicts where the machine is currently located.'))}
      {renderGroup(RenderGroupType.H, 6, t('The paths in the program which have already been executed.'))}
      {renderGroup(RenderGroupType.P, 6, t('Those paths not yet executed from the program.'))}

      {renderGroup(RenderGroupType.X, 4)}
      {renderGroup(RenderGroupType.Y, 4)}
      {renderGroup(RenderGroupType.Z, 4)}
    </Grid>
  );
};

export default AxisPalette;
