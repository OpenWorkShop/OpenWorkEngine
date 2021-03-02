import React, {FunctionComponent} from 'react';
import {FirmwareSettingPolymorphicFragment, KinematicsMode, StatusReportType} from '../../graphql';
import {useTrans} from '../../Context';
import IconSelect, {ISelectItem} from '../../../components/Forms/IconSelect';
import {useLogger} from '../../../hooks';
import NumericInput from '../../../components/Forms/NumericInput';
import {FormControl, InputAdornment} from '@material-ui/core';
import {
  getAxisFlagMask,
  getKinematicsModeTitleKey,
  getParsedValueString,
  getStatusReportTitleKey,
  getUnitsShort
} from '../../Machines';
import useStyles from './styles';
import AxisFlagsSelect from './AxisFlagsSelect';

type Props = {
  setting: FirmwareSettingPolymorphicFragment;
  onChange: (value: string) => void;
};

const FirmwareSettingValueEditor: FunctionComponent<Props> = (props) => {
  const log = useLogger(FirmwareSettingValueEditor);
  const t = useTrans();
  const classes = useStyles();
  const { setting, onChange } = props;
  const typename = setting.currentValue?.__typename;

  const unitsStr = getUnitsShort(setting.units);
  const [ valueStr, setValueStr ] = React.useState<string>(getParsedValueString(setting) ?? setting.value);

  function onAnyValueChanged(strVal: string) {
    setValueStr(strVal);
    onChange(strVal);
  }

  function renderSelect(options: ISelectItem[]) {
    return <IconSelect
      items={options}
      className={classes.input}
      selectedId={valueStr}
      setSelectedId={(v) => onAnyValueChanged(v.toString())}
      label={unitsStr}
    />;
  }

  log.verbose('render', typename, setting);

  if (typename === 'ParsedBool') return renderSelect([true, false].map(m => {
    return { itemId: m.toString(), title: t(m.toString()) } as ISelectItem;
  }));

  if (typename === 'ParsedEnumOfKinematicsMode') return renderSelect(Object.values(KinematicsMode).map(m => {
    return { itemId: m.toString(), title: t(getKinematicsModeTitleKey(m)) } as ISelectItem;
  }));

  if (typename === 'ParsedEnumOfStatusReportType') return renderSelect(Object.values(StatusReportType).map(m => {
    return { itemId: m.toString(), title: t(getStatusReportTitleKey(m)) } as ISelectItem;
  }));

  if (setting.currentValue?.__typename === 'ParsedDecimal') return (<FormControl fullWidth={true}>
    <NumericInput
      id='min'
      variant="standard"
      integersOnly={false}
      numericValue={setting.currentValue.valueDecimal ?? 0}
      onChangeNumericValue={(v) => onAnyValueChanged(v.toString())}
      InputProps={{
        endAdornment: <InputAdornment
          style={{ marginRight: 0, marginLeft: 0, minWidth: 60 }}
          position='end'
        >
          {unitsStr}
        </InputAdornment>,
      }}
    />
  </FormControl>);

  if (setting.currentValue?.__typename === 'ParsedAxisFlags') return <AxisFlagsSelect
    className={classes.input}
    axisFlags={setting.currentValue?.valueAxisFlags}
    setAxisFlags={(f) => onAnyValueChanged(getAxisFlagMask(f).toString())}
  />;

  return (<span>{valueStr} {unitsStr}</span>);
};

export default FirmwareSettingValueEditor;
