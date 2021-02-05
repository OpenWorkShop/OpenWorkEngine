import React, { FunctionComponent } from 'react';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import NumericInput from '../../../components/Forms/NumericInput';
import {useLogger} from '../../../hooks';
import {useTrans} from '../../Context';
import useStyles from '../Controls/styles';
import {Grid, InputAdornment, Typography} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type Props = {
  title: string;
  icon: IconDefinition;
  value?: number;
  override?: number;
};

const OverrideControl: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(OverrideControl);
  const { title, icon, value, override } = props;
  const classes = useStyles();
  const valStr = value && value !== 0 ? value.toString() : '100';
  const canOverride = override !== undefined;

  function onChange(num: number) {
    log.debug('change', num);
  }

  return (
    <Grid container >
      <Grid item xs={2} >
        <Typography variant="h5">{valStr} <span style={{ fontSize: '0.7rem' }}>mm/2</span></Typography>
      </Grid>
      <Grid item xs={6}>
        <NumericInput
          className={classes.override}
          numericValue={override ?? 0}
          onChangeNumericValue={onChange}
          label={title}
          size="small"
          InputProps={{
            startAdornment: <InputAdornment
              style={{ marginRight: 0, marginLeft: 0 }}
              position='start'
            >
              <FontAwesomeIcon icon={icon} />
            </InputAdornment>,
            endAdornment: <span>%</span>,
          }}
        />
      </Grid>
    </Grid>);
};

export default OverrideControl;
