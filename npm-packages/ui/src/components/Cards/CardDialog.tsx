import { Dialog, Card, CardContent, CardHeader, Toolbar, Typography, ThemeProvider, useTheme, DialogContent, DialogTitle, CardActions, DialogActions } from '@material-ui/core';
import * as React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import ThreeColumns from '../Layout/ThreeColumns';
import ToolbarCard from '../Cards/ToolbarCard';
import {IToolbarCardProps} from './ToolbarCard';
import useStyles from './CardStyles';

type Props = IToolbarCardProps & {
  open: boolean;
  onClose: () => void;
};

const CardDialog: React.FunctionComponent<Props> = (props) => {
  const { t } = useTranslation();
  const { open, onClose } = props;
  const theme = useTheme();
  const classes = useStyles();
  const scroll = 'body';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="create workspace"
    >
      <DialogTitle id="scroll-dialog-title" className={classes.cardHeader}>
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
