import { makeStyles, Theme } from '@material-ui/core/styles';
import {rowAlternateCss} from '../../../themes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  dialogFooter: {
    ...rowAlternateCss,
    padding: theme.spacing(2),
  },
}));

export default useStyles;