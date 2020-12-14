import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  popoverTip: {
    position: 'relative',
    bottom: theme.spacing(1),
    left: theme.spacing(0.5),
  }
}));

export default useStyles;
