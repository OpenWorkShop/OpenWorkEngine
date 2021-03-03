import React, {FunctionComponent} from 'react';
import usePromise from 'react-promise-suspense';
import {Redirect} from 'react-router-dom';
import {useOpenController, useTrans} from '../Context';
import {useLogger} from '../../hooks';
import CardDialog from '../../components/Cards/CardDialog';
import {Typography} from '@material-ui/core';

interface OwnProps {
  to: string;
}

type Props = OwnProps;

const ReconnectRedirect: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(ReconnectRedirect);
  const openController = useOpenController();
  const { connection } = openController;
  const [reconnected, setReconnected] = React.useState<boolean>(false);

  usePromise(async () => {
    log.debug('begin reconnection...');
    const rc = await connection.reconnect();
    log.debug('reconnected?', rc);
    setReconnected(rc);
  }, [connection]);

  // A bit odd... the reset of the connection can reset state. But if we get to this point and are connected, it's good.
  const isConnected = reconnected || connection.isConnected;
  log.debug('reconnected?', reconnected, connection.isConnected, 'redirect to', props.to);
  return (
    <React.Fragment>
      {isConnected && <Redirect to={props.to} />}
      <CardDialog
        open={!isConnected}
        title={t('Disconnected')}
      >
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">{t('Failed to re-connect.')}</Typography>
          <Typography variant="body1">
            {t('Please refresh the browser. If the problem persists, restart the device.')}
          </Typography>
        </div>
      </CardDialog>
    </React.Fragment>
  );
};

export default ReconnectRedirect;
