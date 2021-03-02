import {makeStyles, Theme} from '@material-ui/core/styles';
import {rowAlternateCss} from '../../../themes';

const useStyles = makeStyles((theme: Theme) => ({
  jogger: {
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  override: {
    marginTop: theme.spacing(1),
  },
  jogAxisButton: {
    padding: 0,
    height: 44,
    maxWidth: 64,
    width: '100%',
    minWidth: 44,
    backgroundColor: theme.palette.background.paper,
  },
  jogAxisIcon: {
    minWidth: 20,
    minHeight: 20,
  },
  formControl: {
    width: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.paper,
  },
  numberSelect: {
    maxHeight: 44,
  },
  footer: {
    ...rowAlternateCss,
  },
  buttonLeft: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  buttonRight: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  buttonIcon: {
    padding: 0,
    margin: 0,
    position: 'relative',
    left: -8,
  },
  unitsText: {
    paddingRight: theme.spacing(0.5),
    textAlign: 'right',
  }
}));

export default useStyles;
