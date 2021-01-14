import { makeStyles, Theme } from '@material-ui/core/styles';

export const barHeight = 40;
export const componentHeight = 32;
export const iconSizeSm = 16;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5),
    textAlign: 'left',
    height: barHeight,
  },
  formControl: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    height: componentHeight,
  },
  machinePosition: {
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  titleBarButtonGroup: {
    height: componentHeight,
  },
  titleBarButton: {
    padding: 0,
    margin: 0,
  },
  error: {
    color: theme.palette.error.dark,
  },
  chipIcon: {
    width: iconSizeSm,
    height: iconSizeSm,
  },
  popover: {
    marginTop: theme.spacing(1),
  },
  popoverContent: {
    minWidth: 320,
    maxWidth: 320,
  },
  popoverTip: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  popoverRow: {
    padding: theme.spacing(1),
  },
  popoverRowAlt: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  }
}));

export default useStyles;
