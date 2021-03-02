import React, {FunctionComponent} from 'react';
import NumericInput from '../../../components/Forms/NumericInput';
import {useLogger} from '../../../hooks';
import {useTrans} from '../../Context';
import useStyles from './styles';
import {IconButton, InputAdornment, Tooltip, Typography, useTheme} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-solid-svg-icons';
import {MachineSettingUnits} from '../../graphql';
import {getUnitsShort} from '../../Machines';


type Props = {
  title: string;
  units: MachineSettingUnits;
  disabled: boolean;
  className?: string;
  value?: number;
  override?: number;
};

const OverrideControl: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const theme = useTheme();
  const log = useLogger(OverrideControl);
  const { title, value, override, units, className, disabled } = props;
  const classes = useStyles();
  const valStr = value && value !== 0 ? value.toString() : '0';
  const unitsStr = getUnitsShort(units);
  const label = t('{{ title }} ({{ value }} {{ units }})', {
    value: valStr,
    units: unitsStr,
    title,
  });
  const canOverride = override !== undefined;
  const tip = 'tip';

  function onChange(num: number) {
    log.debug('change', num);
  }
  // endAdornment: <span>%</span>,

  const button = <IconButton
    aria-label={tip}
    size='small'
    disabled={disabled}
    disableFocusRipple onClick={() => onChange(0)}
  >
    <FontAwesomeIcon color={theme.palette.primary.main} icon={faCaretSquareDown} />
  </IconButton>;

  return (
    <NumericInput
      className={className}
      numericValue={override ?? 0}
      onChangeNumericValue={onChange}
      label={label}
      disabled={disabled}
      size="small"
      InputProps={{
        endAdornment: <React.Fragment>
          <Typography variant="subtitle2" >%</Typography>
          <InputAdornment
            style={{ marginRight: 0, marginLeft: 0 }}
            position='end'
          >
            {disabled ? button : <Tooltip title={tip}>
              {button}
            </Tooltip>}
          </InputAdornment>
        </React.Fragment>
      }}
    />
  );
};

export default OverrideControl;
