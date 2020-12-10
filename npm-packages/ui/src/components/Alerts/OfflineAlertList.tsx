import { useNetworkStatus } from '@openworkshop/lib/utils/device';
import React from 'react';
import AlertList, {IAlertList} from './AlertList';
import {IAlertMessage, sanitizeAlertMessages} from './types';
import { OpenWorkShop } from '@openworkshop/lib';

type OfflineAlertListProps = IAlertList & {
  severity?: 'warning' | 'error';
  feature?: string;
};

const OfflineAlertList: React.FunctionComponent<OfflineAlertListProps> = (props) => {
  const { isOnline } = useNetworkStatus();
  const ows = React.useContext(OpenWorkShop);
  const { error, errors, warning, warnings, severity } = props;
  const allErrors: IAlertMessage[] = sanitizeAlertMessages(errors, error);
  const allWarnings: IAlertMessage[] = sanitizeAlertMessages(warnings, warning);

  if (!isOnline) {
    const feature = props.feature ?? ows.t('This feature');
    const offlineMessage = ows.t('{{ feature }} is not available whilst offline.', { feature });
    const offlineAlert: IAlertMessage = { name: ows.t('Offline'), message: offlineMessage };
    if (severity === 'warning') allWarnings.push(offlineAlert);
    else allErrors.push(offlineAlert);
  }

  return <AlertList errors={allErrors} warnings={allWarnings} />;
};

export default OfflineAlertList;
