import { useNetworkStatus } from '@openworkshop/lib/utils/device';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AlertList, {IAlertList} from './AlertList';
import {IAlertMessage, sanitizeAlertMessages} from './AlertMessage';

type OfflineAlertListProps = IAlertList & {
  severity?: 'warning' | 'error';
  feature?: string;
};

const OfflineAlertList: React.FunctionComponent<OfflineAlertListProps> = (props) => {
  const { isOnline } = useNetworkStatus();
  const { t } = useTranslation();
  const { error, errors, warning, warnings, severity } = props;
  const allErrors: IAlertMessage[] = sanitizeAlertMessages(errors, error);
  const allWarnings: IAlertMessage[] = sanitizeAlertMessages(warnings, warning);

  if (!isOnline) {
    const feature = props.feature ?? t('This feature');
    const offlineMessage = t('{{ feature }} is not available whilst offline.', feature);
    const offlineAlert: IAlertMessage = { name: t('Offline'), message: offlineMessage };
    if (severity === 'warning') allWarnings.push(offlineAlert);
    else allErrors.push(offlineAlert);
  }

  return <AlertList errors={allErrors} warnings={allWarnings} />;
};

export default OfflineAlertList;
