import {makeStyles, Theme} from '@material-ui/core/styles';
import {rowAlternateCss} from '../../themes';

const useStyles = makeStyles((theme: Theme) => ({
  cardHeader: {
    padding: 0,
  },
  subHeader: {
    justifyContent: 'center',
    margin: 0,
    backgroundColor: theme.palette.background.default,
  },
  cardFooter: {
    ...rowAlternateCss,
    justifyContent: 'center',
    margin: 0,
  },
  root: {
    minWidth: 300,
  },
  content: {
    padding: 0,
  },
  centered: {
    textAlign: 'center',
    verticalAlign: 'center',
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
