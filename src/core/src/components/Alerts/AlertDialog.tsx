import { Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import * as React from 'react';
import AlertList, {IAlertList} from './AlertList';
import useLogger from '../../utils/logging/UseLogger';
import {sanitizeAlertMessages} from './types';
import {useOwsTrans} from '../../hooks';

type AlertDialogProps = IAlertList & {
  title: string;
  children?: React.ReactNode;
  permanent?: boolean; // Can't be closed.
};

const AlertDialog: React.FunctionComponent<AlertDialogProps> = (props) => {
  const log = useLogger(AlertDialog);
  const t = useOwsTrans();
  const { title, children, permanent } = props;
  const warnings = sanitizeAlertMessages(props.warnings, props.warning);
  const errors = sanitizeAlertMessages(props.errors, props.error);
  const [triedClose, setTriedClose] = React.useState(false);
  if (triedClose && permanent) warnings.push({ message: t('This dialog may not be closed.') });
  const hasError = errors.length > 0;
  const hasWarning = warnings.length > 0;
  const [open, setOpen] = React.useState(false);

  function onClose() {
    if (permanent) {
      log.warn('Dialog cannot be closed.');
      setTriedClose(true);
    } else {
      log.debug('close');
      setOpen(false);
    }
  }

  React.useEffect(() => {
    if (hasError || hasWarning) {
      setOpen(Boolean(hasError || hasWarning));
    }
  }, [hasError, hasWarning]);

  if (hasError || hasWarning) log.debug('alert dialog', props);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'body'}
      aria-labelledby="alert dialog"
    >
      <DialogTitle >{title}</DialogTitle>
      <DialogContent >
        <AlertList {...props} warnings={warnings} />
      </DialogContent>
      <DialogActions>{children && children}</DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
