import { makeStyles, Theme } from '@material-ui/core/styles';
import {rowAlternateCss} from '../../themes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  dialogHeader: {
    padding: 0,
  },
  dialogContent: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.default,
    minWidth: 300,
  },
  dialogFooter: {
    ...rowAlternateCss,
    justifyContent: 'center',
    margin: 0,
  },
}));

export default useStyles;
