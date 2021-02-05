import { makeStyles, Theme } from '@material-ui/core/styles';
import {rowAlternateCss} from '../../../themes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(1),
    textAlign: 'center',
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
  dialogFooter: {
    ...rowAlternateCss,
    padding: theme.spacing(2),
  },
  override: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
