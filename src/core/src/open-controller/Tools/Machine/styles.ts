import {makeStyles, Theme} from '@material-ui/core/styles';
import {altBackgroundColor} from '../../../themes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  accordion: {
    minHeight: 24,
    padding: 0,
    margin: 0,
  },
  accordionSummary: {
    minHeight: 24,
    height: 30,
    margin: 0,
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  closeButton: {
    backgroundColor: theme.palette.secondary.dark,
    color: 'white',
  },
  resetButton: {
    backgroundColor: theme.palette.error.dark,
    color: 'white',
  },
  applyButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  settingRow: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  settingRowAlt: {
    ...altBackgroundColor,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  input: {
    textAlign: 'center',
    width: '100%',
  },
}));

export default useStyles;
