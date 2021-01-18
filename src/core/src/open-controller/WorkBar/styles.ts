import { makeStyles, Theme } from '@material-ui/core/styles';
import {rowAlternateCss, rowDefaultCss} from '../../themes';

export const barHeight = 40;
export const componentHeight = 32;
export const iconSizeSm = 16;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5),
    height: componentHeight,
    display: 'flex',
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
  titleBarButtonGroup: {
    height: componentHeight,
  },
  titleBarRightGroup: {
    textAlign: 'right',
    // position: 'absolute',
    // right: theme.spacing(1),
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
