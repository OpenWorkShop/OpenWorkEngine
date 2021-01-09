import { MenuItem, Select, Grid, FormControl } from '@material-ui/core';
import * as React from 'react';
import useStyles from './Styles';
import {OpenWorkShopIcon} from '../../components';
import {getDistanceUnitAbbreviationKey, getDistanceUnitIconKey} from './InchesMillimeters';
import {useOwsTrans} from '../../Hooks';

type Props = {
  isImperial: boolean;
  setIsImperial: (imp: boolean) => void;
};

const InchesMillimetersSelect: React.FunctionComponent<Props> = (props) => {
  const t = useOwsTrans();
  const classes = useStyles();
  const { isImperial, setIsImperial } = props;

  function renderMenuItem(imperial: boolean) {
    const title = t(getDistanceUnitAbbreviationKey(imperial));
    const val = imperial ? 1 : 0;
    const icon = getDistanceUnitIconKey(imperial);
    return <MenuItem className={classes.selectMenuItem} value={val} >
      <Grid container>
        <Grid item>
          <OpenWorkShopIcon name={icon} className={classes.selectIcon} />
        </Grid>
        <Grid>{title}</Grid>
      </Grid>
    </MenuItem>;
  }

  return (
    <FormControl className={classes.formControl} >
      <Select
        value={isImperial ? 1 : 0}
        className={classes.selectMenu}
        onChange={(e) => setIsImperial(e.target.value !== 0)}
      >
        {renderMenuItem(true)}
        {renderMenuItem(false)}
      </Select>
    </FormControl>
  );
};

export default InchesMillimetersSelect;
