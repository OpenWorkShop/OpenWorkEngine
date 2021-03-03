import * as React from 'react';
import useLogger from '../../utils/logging/UseLogger';
import {useBackendConnectionState, useTrans} from '../Context';
import {ConnectionState} from '../../api';
import CardDialog from '../../components/Cards/CardDialog';
import {CircularProgress, Typography} from '@material-ui/core';

const BackendDisconnectedModal: React.FunctionComponent = () => {
  const log = useLogger(BackendDisconnectedModal);
  const t = useTrans();
  const connectionState: ConnectionState = useBackendConnectionState();
  const [timedOut, setTimedOut] = React.useState(false);
  const isConnected = connectionState === ConnectionState.Connected;

  React.useEffect(() => {
    log.debug('connected?', connectionState);
    if (!isConnected) {
      if (timedOut) {
        setTimedOut(false);
        window.location.reload();
        return;
      }
      setTimeout(() => {
        setTimedOut(true);
      }, 30000);
    } else {
      setTimedOut(false);
    }
  }, [connectionState, isConnected, timedOut]);

  return (
    <CardDialog
      open={!isConnected}
      title={t('Disconnected')}
    >
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6">{t('Trying to Reconnect...')}</Typography>
      </div>
    </CardDialog>
  );
};

export default BackendDisconnectedModal;
