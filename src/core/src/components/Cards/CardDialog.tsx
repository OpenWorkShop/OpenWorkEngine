import { Dialog, Toolbar, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import * as React from 'react';
import {IToolbarCardProps} from './ToolbarCard';
import useStyles from './CardStyles';

type Props = IToolbarCardProps & {
  open: boolean;
  onClose: () => void;
};

const CardDialog: React.FunctionComponent<Props> = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const scroll = 'paper';


  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby={props.title}
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
