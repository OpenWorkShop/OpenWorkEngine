import {Select, MenuItem, FormControl, InputLabel, Grid} from '@material-ui/core';
import * as React from 'react';
import _ from 'lodash';
import useStyles from './styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import AnyIcon, {IHaveAnyIcon} from '../AnyIcon';

export type SelectId = string | number;

interface ISelectItem extends IHaveAnyIcon {
  itemId: SelectId;
  title: string;
  color?: string;
}

interface ISelectProps<T extends ISelectItem> {
  items: T[];
  selectedId: SelectId;
  setSelectedId: (v: SelectId) => void;
  help?: string;
  helpColor?: string;
  label?: string;
  variant?: 'standard' | 'outlined' | 'filled';
}

const IconSelect: React.FunctionComponent<ISelectProps<ISelectItem>> = (props) => {
  const classes = useStyles();
  const { help, helpColor, items, label, selectedId, setSelectedId, variant } = props;
  const value = selectedId?.toString();

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
    <FormControl fullWidth className={classes.formControl} >
      {label && <InputLabel >{label}</InputLabel>}
      <Select
        value={value}
        variant={variant}
        onChange={(e) => setValue(e.target.value)}
        label={label}
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
