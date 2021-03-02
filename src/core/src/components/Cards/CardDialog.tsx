import {Dialog, DialogActions, DialogContent, DialogTitle, Toolbar} from '@material-ui/core';
import * as React from 'react';
import {IToolbarCardProps} from './ToolbarCard';
import useStyles from './CardStyles';
import {useLogger} from '../../hooks';

export interface ICardDialogProps {
  open?: boolean;
  onClose?: () => void;
  preventClose?: boolean;
}

type Props = IToolbarCardProps & ICardDialogProps;

const CardDialog: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(CardDialog);
  const { open, onClose, preventClose } = props;
  const [ internalOpen, setInternalOpen ] = React.useState(Boolean(open));
  const classes = useStyles();
  const scroll = 'paper';

  function handleClose() {
    if (preventClose) {
      log.warn('dialog may not be closed');
      return;
    }
    setInternalOpen(false);
    if (onClose) onClose();
  }

  React.useEffect(() => {
    if (open !== undefined && open != internalOpen) {
      setInternalOpen(open);
    }
  }, [open, internalOpen]);

  return (
    <Dialog
      open={internalOpen}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby={props.title}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle className={classes.cardHeader}>
        <Toolbar>
          {props.title}
        </Toolbar>
      </DialogTitle>
      {props.subHeader && <DialogActions className={classes.subHeader}>{props.subHeader}</DialogActions>}
      <DialogContent className={classes.content}>
        {props.children}
      </DialogContent>
      {props.footer && <DialogActions className={classes.cardFooter}>{props.footer}</DialogActions>}
    </Dialog>
  );
};

export default CardDialog;
