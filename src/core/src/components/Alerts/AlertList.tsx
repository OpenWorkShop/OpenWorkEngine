import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import useLogger from '../../utils/logging/UseLogger';
import AlertMessage from './AlertMessage';
import {IAlertMessage, AlertMessageList, sanitizeAlertMessages} from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      'paddingTop': theme.spacing(1),
      'width': '100%',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
  }),
);

export interface IAlertList {
  error?: IAlertMessage;
  errors?: AlertMessageList;
  warning?: IAlertMessage;
  warnings?: AlertMessageList;
}

type OwnProps = IAlertList;

const AlertList: React.FunctionComponent<OwnProps> = (props) => {
  const log = useLogger(AlertList);
  const classes = useStyles();
  const { error, errors, warning, warnings } = props;
  const allErrors: IAlertMessage[] = sanitizeAlertMessages(errors, error);
  const allWarnings: IAlertMessage[] = sanitizeAlertMessages(warnings, warning);

  const count = allErrors.length + allWarnings.length;

  if (count <= 0) return <div />;
  if (allErrors.length > 0) log.error('errors', allErrors, 'warnings', allWarnings);
  else if (allWarnings.length > 0) log.warn(allWarnings);

  let i = 0;

  return (
    <div className={classes.root}>
      {allErrors.map((e) => {
        return (
          <AlertMessage key={i} alert={e} severity="error" />
        );
      })}
      {allWarnings.map((a) => {
        i++;
        return (
          <AlertMessage key={i} alert={a} severity="warning" />
        );
      })}
    </div>
  );
};

export default AlertList;
