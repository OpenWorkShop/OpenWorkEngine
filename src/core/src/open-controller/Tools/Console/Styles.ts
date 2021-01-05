import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  console: {
    height: 200,
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  }
}));

export default useStyles;
