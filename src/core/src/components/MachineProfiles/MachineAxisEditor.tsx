
import React from 'react';
import { Grid, Typography, InputAdornment } from '@material-ui/core';
import AlertList from '../Alerts/AlertList';
import HoverHelpStep from '../Alerts/HoverHelpStep';
import NumericInput from '../Forms/NumericInput';
import {IAlertMessage} from '../Alerts';
import {useOwsTrans} from '../../hooks';
import {IAxisProps} from '../../open-controller/Machines/CustomizedMachine';
import useStyles from './styles';

interface IMachineAxisEditorProps {
  axis: IAxisProps;
  onChanged: (axis: IAxisProps) => void;
}

type AxisKey = 'min' | 'max' | 'precision' | 'accuracy';

const MachineAxisEditor: React.FunctionComponent<IMachineAxisEditorProps> = (props) => {
  const t = useOwsTrans();
  const classes = useStyles();
  const axis = props.axis;
  const axisName = axis.name.toLowerCase();
  const isX = axisName === 'x';
  const isY = axisName === 'y';
  const isXY = isX || isY;
  const isZ = axisName === 'z';
  const isXYZ = isXY || isZ;
  const warnings: IAlertMessage[] = [];

  if (axis.precision < 0 || axis.precision >= 20) warnings.push({ message: t('Precision value is unusual.') });
  if (axis.accuracy < 0.0000001 || axis.accuracy > 1) warnings.push({ message: t('Accuracy value is unusual.') });

  function getTooltip(key: AxisKey): string | undefined {
    if (!isXYZ) return undefined;
    if (key === 'min') {
      if (isZ)
        return t('For CNC machines, the max plunge distance (negative). For 3D printers, this should remain zero.');
      if (isXY)
        return t(
          'If the origin is in the bottom-left, this should remain zero. If the origin is in the middle, it should the same value as max -- except negative.',
        );
    }
    if (key === 'max') {
      let dir = t('vertical');
      if (isX) dir = t('rightward');
      if (isY) dir = t('upward-horizontal');
      return t('The maximum distance to move (in the {{ dir }} direction).', { dir });
    }
    if (key === 'precision') {
      return t('The number of digits to round the axis value to in the UI.');
    }
    if (key === 'accuracy') {
      return t('The smallest distance at which this axis can accurately move.');
    }
    return undefined;
  }

  function renderCell(key: AxisKey) {
    const name = t(key.charAt(0).toUpperCase() + key.substring(1));
    const units = key === 'precision' ? t('digits') : 'mm';
    const tip = getTooltip(key);
    return (
      <Grid item xs={12} >
        <NumericInput
          id='min'
          label={name}
          className={classes.axisInput}
          variant="standard"
          integersOnly={key === 'precision'}
          numericValue={axis[key]}
          onChangeNumericValue={(v) => props.onChanged({ ...axis, [key]: v })}
          InputProps={{
            startAdornment: tip && (
              <InputAdornment style={{ marginRight: 0 }} position='start'>
                <HoverHelpStep tip={tip} />
              </InputAdornment>
            ),
            endAdornment: <InputAdornment
              style={{ marginRight: 0, marginLeft: 0 }}
              position='end'
            >
              {units}
            </InputAdornment>,
          }}
        />
      </Grid>
    );
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          {props.axis.name}
          {t('-Axis')}
        </Typography>
      </Grid>
      {renderCell('min')}
      {renderCell('max')}
      {renderCell('accuracy')}
      {renderCell('precision')}
      <AlertList warnings={warnings} />
    </Grid>
  );
};

export default MachineAxisEditor;
