import {FormControl, Grid, InputLabel, MenuItem, Select} from '@material-ui/core';
import * as React from 'react';
import _ from 'lodash';
import useStyles from './styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import AnyIcon, {IHaveAnyIcon} from '../AnyIcon';

export type SelectId = string | number;

export interface ISelectItem {
  itemId: SelectId;
  title: string;
  color?: string;
}

export type SelectItemIcon = ISelectItem & IHaveAnyIcon;

interface ISelectProps<T extends SelectItemIcon> {
  items: T[];
  selectedId: SelectId;
  setSelectedId: (v: SelectId) => void;
  disabled?: boolean;
  className?: string;
  help?: string;
  helpColor?: string;
  label?: string;
  variant?: 'standard' | 'outlined' | 'filled';
}

const IconSelect: React.FunctionComponent<ISelectProps<SelectItemIcon>> = (props) => {
  const classes = useStyles();
  const { help, helpColor, items, label, selectedId, setSelectedId, variant, disabled } = props;
  const value = selectedId?.toString();
  const className = props.className ?? classes.formControl;

  function renderValue(selected: string) {
    const i = _.find(items, i => i.itemId.toString() === selected);
    if (!i) return null;
    return <Grid container spacing={0} >
      <Grid item xs={1}>
        <AnyIcon
          faIcon={i.faIcon}
          owsIcon={i.owsIcon}
          className={classes.selectIcon}
          color={i.color}
        />
      </Grid>
      <Grid item xs={11}>
        {i.title}
      </Grid>
    </Grid>;
  }

  function setValue(val: string) {
    if (typeof selectedId === 'number') {
      setSelectedId(Number(val));
    } else {
      setSelectedId(val);
    }
  }

  return (
    <FormControl fullWidth className={className} >
      {label && <InputLabel >{label}</InputLabel>}
      <Select
        value={value}
        variant={variant}
        onChange={(e) => setValue(e.target.value)}
        label={label}
        disabled={disabled}
        className={classes.selectMenu}
        renderValue={renderValue}
      >
        {items.map(i => {
          return (
            <MenuItem key={i.itemId} value={i.itemId} className={classes.selectMenuItem} >
              <AnyIcon
                faIcon={i.faIcon}
                owsIcon={i.owsIcon}
                className={classes.selectIcon}
                color={i.color}
              />
              {i.title}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText style={helpColor ? { color: helpColor } : {}}>{help}</FormHelperText>
    </FormControl>
  );
};

export default IconSelect;
