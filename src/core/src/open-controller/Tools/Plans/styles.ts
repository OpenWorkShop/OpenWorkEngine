import {makeStyles, Theme} from '@material-ui/core/styles';
import {rowAlternateCss} from '../../../themes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  footer: {
    ...rowAlternateCss,
  },
}));

export default useStyles;
