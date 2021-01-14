import {FormControl, Grid, MenuItem, Select} from '@material-ui/core';
import * as React from 'react';
import useStyles from './Styles';
import {OpenWorkShopIcon} from '../../components';
import {getDistanceUnitAbbreviationKey, getDistanceUnitIconKey} from './InchesMillimeters';
import {useOwsTrans} from '../../Hooks';
import {UnitType} from '../../open-controller/graphql';

type Props = {
  units: UnitType;
  setUnits: (units: UnitType) => void;
};

const InchesMillimetersSelect: React.FunctionComponent<Props> = (props) => {
  const t = useOwsTrans();
  const classes = useStyles();
  const { units, setUnits } = props;

  function renderMenuItem(u: UnitType) {
    const title = t(getDistanceUnitAbbreviationKey(u));
    const icon = getDistanceUnitIconKey(u);
    return <MenuItem className={classes.selectMenuItem} value={u} >
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
        value={units}
        className={classes.selectMenu}
        onChange={(e) => setUnits(e.target.value)}
      >
        {renderMenuItem(UnitType.Imperial)}
        {renderMenuItem(UnitType.Metric)}
      </Select>
    </FormControl>
  );
};

export default InchesMillimetersSelect;
