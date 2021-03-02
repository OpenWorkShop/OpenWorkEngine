import {useNetworkStatus} from '../../utils/device';
import React, {FunctionComponent} from 'react';
import {OfflineAlertList} from '../../components/Alerts';
import {useOpenControllerSettings, useTrans} from '../Context';

const Docs: FunctionComponent = () => {
  const isOnline = useNetworkStatus();
  const settings = useOpenControllerSettings();
  const t = useTrans();
  const fs = { width: '100%', height: '100%' };

  if (!isOnline) {
    return <OfflineAlertList feature={t('The {{ productName }} documentation', settings)} />;
  }

  return (
    <div style={{ ...fs, position: 'absolute', marginLeft: -200 }}>
      <iframe
        src="http://makerverse.com"
        style={{ ...fs, display: 'block', border: 'none', margin: '0 auto' }}
      />
    </div>
  );
};

export default Docs;
