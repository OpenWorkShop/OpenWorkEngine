import React, { FunctionComponent } from 'react';
import {AxisFlags} from '../../graphql';
import {Checkbox, Input, ListItemText, MenuItem, Select, Typography} from '@material-ui/core';
import {AxisFlagKey} from '../../Machines';
import {useLogger} from '../../../hooks';
import {useTrans} from '../../Context';

type Props = {
  axisFlags: AxisFlags;
  setAxisFlags: (flags: AxisFlags) => void;
  className?: string;
}

const AxisFlagsSelect: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(AxisFlagsSelect);
  const { axisFlags, setAxisFlags, className } = props;
  const keys: AxisFlagKey[] =
    Object.keys(axisFlags).filter(v => !v.startsWith('_')).map(s => s as AxisFlagKey);
  const [ activeKeys, setActiveKeys ] = React.useState(keys.filter(k => axisFlags[k]));

  function onChange(v: AxisFlagKey[]): void {
    log.debug('flags', v);
    setActiveKeys(v);
    const flags = { ...axisFlags };
    keys.forEach(k => {
      flags[k] = v.includes(k);
    });
    setAxisFlags(flags);
  }

  return (
    <Select
      multiple
      value={activeKeys}
      onChange={e => onChange(e.target.value)}
      input={<Input />}
      displayEmpty={true}
      renderValue={(selected) => selected.length > 0 ? selected.join(', ') :
        <Typography variant="subtitle2">{t('(None)')}</Typography>}
      className={className}
    >
      {keys.map(k => {
        return <MenuItem key={k} value={k}>
          <Checkbox checked={activeKeys.includes(k)} />
          <ListItemText primary={k} />
        </MenuItem>;
      })}
    </Select>
  );
};

export default AxisFlagsSelect;
