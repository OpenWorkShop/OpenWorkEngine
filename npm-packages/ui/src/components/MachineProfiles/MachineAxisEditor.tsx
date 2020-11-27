import { MachineAxisPropsFragment } from '@openworkshop/lib/api/graphql';
import React from 'react';
import { Grid, Typography, InputAdornment, useTheme, Tooltip, IconButton } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import AlertList from '../Alerts/AlertList';
import HoverHelpStep from '../Alerts/HoverHelpStep';
import NumericInput from '../Forms/NumericInput';
import { Alert } from '@material-ui/core';

interface IMachineAxisEditorProps {
  axis: MachineAxisPropsFragment;
  onChanged: (axis: MachineAxisPropsFragment) => void;
}

type AxisKey = 'min' | 'max' | 'precision' | 'accuracy';

const MachineAxisEditor: React.FunctionComponent<IMachineAxisEditorProps> = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const axis = props.axis;
  const axisName = axis.name.toLowerCase();
  const isX = axisName === 'x';
  const isY = axisName === 'y';
  const isXY = isX || isY;
  const isZ = axisName === 'z';
  const isXYZ = isXY || isZ;
  const warnings = [];

  if (axis.precision < 0 || axis.precision >= 20) warnings.push(t('Precision value is unusual.'));
  if (axis.accuracy < 0.0000001 || axis.accuracy > 1) warnings.push(t('Accuracy value is unusual.'));

  function getTooltip(key: AxisKey) {
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
      <Grid item xs={12} lg={6}>
        <NumericInput
          id='min'
          label={name}
          variant='outlined'
          integersOnly={key === 'precision'}
          numericValue={axis[key] as number}
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          {props.axis.name}
          <Trans>-Axis</Trans>
        </Typography>
      </Grid>
      {renderCell('min')}
      {renderCell('max')}
      {renderCell('accuracy')}
      {renderCell('precision')}
      {warnings.length > 0 && (
        <AlertList>
          {warnings.map((w) => {
            return (
              <Alert key='w' severity='warning'>
                {w}
              </Alert>
            );
          })}
        </AlertList>
      )}
    </Grid>
  );
};

export default MachineAxisEditor;
