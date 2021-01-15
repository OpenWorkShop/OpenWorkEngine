import {Grid, Select, MenuItem, FormControl, InputLabel} from '@material-ui/core';
import * as React from 'react';
import useStyles from './Styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import AnyIcon, {IHaveAnyIcon} from '../AnyIcon';

export type SelectId = string | number;

interface ISelectItem extends IHaveAnyIcon {
  itemId: SelectId;
  title: string;
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

  return (
    <FormControl fullWidth className={classes.formControl} >
      {label && <InputLabel >{label}</InputLabel>}
      <Select
        value={selectedId}
        variant={variant}
        onChange={(e) => setSelectedId(e.target.value)}
        label={label}
      >
        <Grid container>
          {items.map(i => {
            return (
              <MenuItem key={i.itemId} value={i.itemId} >
                <Grid item xs={2}>
                  <AnyIcon
                    faIcon={i.faIcon}
                    owsIcon={i.owsIcon}
                    className={classes.selectIcon}
                  />
                </Grid>
                <Grid item xs={10}>{i.title}</Grid>
              </MenuItem>
            );
          })}
        </Grid>
      </Select>
      <FormHelperText style={helpColor ? { color: helpColor } : {}}>{help}</FormHelperText>
    </FormControl>
  );
};

export default IconSelect;
