import _ from 'lodash';
import { Alert, Typography } from '@material-ui/core';
import * as React from 'react';

export interface IAlertMessage {
  name?: string;
  message?: string;
}

type Props = IAlertMessage & {
 severity: 'warning' | 'error';
};

// Combine lots of possibly undefined alerts into a single, well-formed array.
export function sanitizeAlertMessages(alerts?: (IAlertMessage | undefined)[], alert?: IAlertMessage): IAlertMessage[] {
  const ret: IAlertMessage[] = [];
  (alerts ?? []).forEach((e) => {
    if (e != null) ret.push(e);
  });
  if (alert) ret.push(alert);
  return ret;
}

const AlertMessage: React.FunctionComponent<Props> = (props) => {
  const { severity, name, message } = props;

  function splitMessage(msg?: string): string {
    if (!msg) return '';
    const lines = _.uniq(msg.split('\n'));
    return lines.join('<br />');
  }

  return (
    <Alert severity={severity} >
      {name && <Typography variant="h6">{name}</Typography>}
      {splitMessage(message)}
    </Alert>
  );
};

export default AlertMessage;
