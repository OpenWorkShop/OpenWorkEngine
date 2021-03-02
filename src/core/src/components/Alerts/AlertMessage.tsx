import _ from 'lodash';
import {Alert, Typography} from '@material-ui/core';
import * as React from 'react';
import {IAlertMessage} from './types';
import {useOwsTrans} from '../../hooks';


type Props = {
 severity: 'warning' | 'error';
 alert: IAlertMessage;
};

const AlertMessage: React.FunctionComponent<Props> = (props) => {
  const t = useOwsTrans();
  const { severity, alert } = props;
  const { name, message } = alert;
  const lines = message ? _.uniq(message.split('\n')) : [];

  const typeName = (name ?? '').replace('Exception', '')
    .replace('Error', '').trim();
  const type = typeName.length > 0 ? typeName : t('Unknown');

  return (
    <Alert severity={severity} >
      {<Typography variant="h6">{t('{{ type }} Error', { type })}</Typography>}
      {lines.map(l => {
        return <div key={l} >{l}</div>;
      })}
    </Alert>
  );
};

export default AlertMessage;
