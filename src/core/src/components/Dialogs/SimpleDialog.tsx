import React, { FunctionComponent } from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Toolbar, Typography} from '@material-ui/core';
import useStyles from './styles';
import {ICanClose} from './types';
import HelpfulHeader from '../Text/HelpfulHeader';

type Props = ICanClose & {
  title?: string;
  tip?: string;
  minContentHeight?: number;
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  scroll?: 'body' | 'paper';
};

const SimpleDialog: FunctionComponent<Props> = (props) => {
  const { open, onClose, header, title, tip, children, footer, scroll, minContentHeight } = props;
  const contentStyles = minContentHeight ? { minHeight: minContentHeight } : undefined;
  const classes = useStyles();

  function getToolbarContent(): React.ReactNode {
    if (header) return header;
    if (title && tip) return <HelpfulHeader tip={tip} title={title} />;
    if (title) return <Typography variant="h5" >{title}</Typography>;
    return undefined;
  }

  const tbc = getToolbarContent();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll ?? 'paper'}
      aria-labelledby={title}
      className={classes.root}
    >
      {tbc && <DialogTitle className={classes.dialogHeader}>
        <Toolbar>
          {tbc}
        </Toolbar>
      </DialogTitle>}
      {children && <DialogContent className={classes.dialogContent} style={contentStyles}>
        {children}
      </DialogContent>}
      {footer && <DialogActions className={classes.dialogFooter}>
        {footer}
      </DialogActions>}
    </Dialog>
  );
};

export default SimpleDialog;
