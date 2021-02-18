import * as React from 'react';
import {FormControl, InputLabel, Select, MenuItem, Typography, Grid} from '@material-ui/core';
import useStyles from './styles';
import {useTrans} from '../../Context';
import {UnitType} from '../../graphql';
import {getDistanceUnitAbbreviationKey} from '../../../components/Units';

type Props = {
  title: string;
  stepValue: number;
  setStepValue: (v: number) => void;
  steps: number[];
  units: UnitType;
};

const JogStepSelect: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const classes = useStyles();
  const { title, setStepValue, steps, units } = props;
  const stepValue = steps.includes(props.stepValue) ? props.stepValue : steps[0];
  const abbr = getDistanceUnitAbbreviationKey(units);

  function renderValue(selected: number) {
    const t = selected < 1 && selected > 0.01 ? selected.toPrecision(2) : selected;
    return <Grid container spacing={0} >
      <Grid item xs={8} className={classes.unitsText}>
        <Typography>{t}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography color="textSecondary">{abbr}</Typography>
      </Grid>
    </Grid>;
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel >{title}</InputLabel>
      <Select
        value={stepValue}
        className={classes.numberSelect}
        onChange={(e) => setStepValue(e.target.value)}
        label={t('Axis Movement Amounts')}
        renderValue={renderValue}
      >
        {steps.map(s => {
          return <MenuItem value={s} key={s} >{renderValue(s)}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default JogStepSelect;
