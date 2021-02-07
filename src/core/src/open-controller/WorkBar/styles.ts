import { makeStyles, Theme } from '@material-ui/core/styles';
import {rowAlternateCss, rowDefaultCss} from '../../themes';

export const barHeight = 40;
export const componentHeight = 32;
export const iconSizeSm = 16;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5),
  },
  workBarTitle: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  workBarTitleText: {
    margin: 0,
    padding: 0,
  },
  workbarChip: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    height: componentHeight,
  },
  machinePosition: {
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  titleBarLeftGroup: {
    height: componentHeight,
    textAlign: 'right',
    marginRight: theme.spacing(0.5),
  },
  titleBarRightGroup: {
    height: componentHeight,
    textAlign: 'right',
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
    ...rowDefaultCss,
    padding: theme.spacing(1),
  },
  popoverRowAlt: {
    ...rowAlternateCss,
    padding: theme.spacing(1),
  }
}));

export default useStyles;
