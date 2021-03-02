import { makeStyles, Theme } from '@material-ui/core/styles';
import {rowAlternateCss} from '../../themes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  dialogContent: {
    padding: theme.spacing(0.5),
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
}));

export default useStyles;
