import _ from 'lodash';
import { Alert, Typography } from '@material-ui/core';
import * as React from 'react';
import {IAlertMessage} from './types';
import {useOwsTrans} from '@openworkshop/lib';


type Props = IAlertMessage & {
 severity: 'warning' | 'error';
};

const AlertMessage: React.FunctionComponent<Props> = (props) => {
  const t = useOwsTrans();
  const { severity, name, message } = props;
  const lines = message ? _.uniq(message.split('\n')) : [];

  const type = name && name.endsWith('Exception') ?
    name.substr(0, name.length - 'Exception'.length) : name;
  const title = type && type.length > 0 ? t('{{ type }} Error', { type }) : undefined;

  return (
    <Alert severity={severity} >
      {title && <Typography variant="h6">{title}</Typography>}
      {lines.map(l => {
        return <div key={l} >{l}</div>;
      })}
    </Alert>
  );
};

export default AlertMessage;
