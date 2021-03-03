import React, {FunctionComponent} from 'react';
import {CardDialog, ICanClose} from '../../../components';
import {useTrans} from '../../Context';
import IconSelect from '../../../components/Forms/IconSelect';
import {MachineLogLevel} from '../../graphql';
import {getLogLevelColor, getLogLevelIcon, getLogLevelTitleKey, machineLogLevels} from '../../Machines';
import {IMachineLogFilters} from './types';
import {useLogger} from '../../../hooks';
import {useTheme} from '@material-ui/core';

type Props = ICanClose & {
  filters: IMachineLogFilters,
  setFilters: (filters: IMachineLogFilters) => void,
}

const LogFiltersDialog: FunctionComponent<Props> = (props) => {
  const log = useLogger(LogFiltersDialog);
  const t = useTrans();
  const theme = useTheme();
  const { filters, setFilters, open, onClose } = props;
  const logLevelOpts = machineLogLevels.map((ll) => {
    return {
      itemId: ll.valueOf(),
      title: t(getLogLevelTitleKey(ll)),
      faIcon: getLogLevelIcon(ll),
      color: getLogLevelColor(ll, theme),
    };
  });

  function filter(f: IMachineLogFilters) {
    log.debug('update filters', f);
    setFilters(f);
  }

  return (
    <CardDialog title={t('Filters')} open={open} onClose={onClose} >
      <IconSelect
        items={logLevelOpts}
        selectedId={filters.minimumLogLevel}
        setSelectedId={(id) => filter({ ...filters, minimumLogLevel: id as MachineLogLevel })}
        label={t('Minimum Log Level')}
      />
    </CardDialog>
  );
};

export default LogFiltersDialog;
