import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import AlertMessage, {IAlertMessage, sanitizeAlertMessages} from './AlertMessage';

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
  errors?: (IAlertMessage | undefined)[];
  warning?: IAlertMessage;
  warnings?: (IAlertMessage | undefined)[];
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

  return (
    <div className={classes.root}>
      {allErrors.map((e) => {
        return (
          <AlertMessage key={e.message} {...e} severity="error" />
        );
      })}
      {allWarnings.map((a) => {
        return (
          <AlertMessage key={a.message} {...a} severity="warning" />
        );
      })}
    </div>
  );
};

export default AlertList;
