import {makeStyles, Theme} from '@material-ui/core/styles';
import {rowAlternateCss} from '../../../themes';

const useStyles = makeStyles((_: Theme) => ({
  root: {
  },
  footer: {
    ...rowAlternateCss,
  },
}));

export default useStyles;
