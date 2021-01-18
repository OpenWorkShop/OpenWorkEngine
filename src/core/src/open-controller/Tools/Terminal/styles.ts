import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'black',
    color: 'white',
    padding: theme.spacing(0.5),
    height: 200,
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
}));

export default useStyles;
