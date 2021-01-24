import { useNetworkStatus } from '../../utils/device';
import React from 'react';
import AlertList, {IAlertList} from './AlertList';
import {IAlertMessage, sanitizeAlertMessages} from './types';
import {useOwsTrans} from '../../hooks';

type OfflineAlertListProps = IAlertList & {
  severity?: 'warning' | 'error';
  feature?: string;
};

const OfflineAlertList: React.FunctionComponent<OfflineAlertListProps> = (props) => {
  const { isOnline } = useNetworkStatus();
  const t = useOwsTrans();
  const { error, errors, warning, warnings, severity } = props;
  const allErrors: IAlertMessage[] = sanitizeAlertMessages(errors, error);
  const allWarnings: IAlertMessage[] = sanitizeAlertMessages(warnings, warning);

  if (!isOnline) {
    const feature = props.feature ?? t('This feature');
    const offlineMessage = t('{{ feature }} is not available whilst offline.', { feature });
    const offlineAlert: IAlertMessage = { name: t('Offline'), message: offlineMessage };
    if (severity === 'warning') allWarnings.push(offlineAlert);
    else allErrors.push(offlineAlert);
  }

  return <AlertList errors={allErrors} warnings={allWarnings} />;
};

export default OfflineAlertList;
