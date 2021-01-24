import { makeStyles, Theme } from '@material-ui/core/styles';
import {toolbarHeight, workBarHeight, rowAlternateCss} from '../../themes';

const lightColor = 'white';

const useStyles = makeStyles((theme: Theme) => ({
  controllerCard: {
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    top: toolbarHeight + workBarHeight + 8,
    right: theme.spacing(1),
    width: 300,
    border: theme.palette.grey.A200,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  controllerCardActions: {
    ...rowAlternateCss,
    padding: 0,
  },
  controllerCardHeader: {
    padding: 0,
  },
  controllerCardQuickActionButton: {
    margin: theme.spacing(0.5),
  },
  controllerCardContent: {
    padding: 0,
    paddingBottom: 0,
  },
  toolTabPanel: {
    padding: 0,
  },
  emergencyButton: {
    backgroundColor: theme.palette.error.dark,
    color: lightColor,
    '&:hover': {
      backgroundColor: lightColor,
      color: theme.palette.error.dark,
    },
  },
  emergencyButtonInverted: {
    backgroundColor: lightColor,
    color: theme.palette.error.dark,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
      color: lightColor
    },
  },
  alarm: {
    backgroundColor: theme.palette.error.dark,
    color: lightColor,
  },
  warn: {
    backgroundColor: theme.palette.warning.dark,
    color: lightColor,
  },
  ready: {
    backgroundColor: theme.palette.primary.light,
    color: lightColor,
  },
  running: {
    backgroundColor: theme.palette.secondary.dark,
    color: lightColor,
  },
  paused: {
    backgroundColor: theme.palette.info.dark,
    color: lightColor,
  },
  done: {
    backgroundColor: theme.palette.success.dark,
    color: lightColor,
  },
  disabled: {
    backgroundColor: theme.palette.grey.A200,
    color: lightColor,
  },
  toolTab: {
    minWidth: 60, // Get rid of 160
  },
}));

export default useStyles;
