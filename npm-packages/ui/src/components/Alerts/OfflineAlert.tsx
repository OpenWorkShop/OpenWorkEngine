import { useNetworkStatus } from '@openworkshop/lib/utils/device';
import React from 'react';
import { Alert } from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';

interface IOfflineAlertProps {
  severity?: 'warning' | 'error';
  feature?: string;
}

const OfflineAlert: React.FunctionComponent<IOfflineAlertProps> = (props) => {
  const { isOnline } = useNetworkStatus();
  const { t } = useTranslation();

  if (isOnline) return null;

  const severity = props.severity ?? 'warning';
  const feature = props.feature ?? t('This feature');

  return (
    <Alert severity={severity}>
      <Trans>{feature} is not available whilst offline.</Trans>
    </Alert>
  );
};

export default OfflineAlert;
