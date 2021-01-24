import { makeStyles, Theme } from '@material-ui/core/styles';
import 'typeface-roboto-mono';

const codeFont = 'Roboto Mono';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'black',
    color: 'white',
    fontFamily: codeFont,
    fontSize: '1rem',
    padding: theme.spacing(0.5),
    overflowY: 'scroll',
    height: 200,
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  prompt: {
    fontWeight: 'bold',
    color: theme.palette.divider,
    textAlign: 'right',
    paddingRight: theme.spacing(0.5),
  },
  code: {
    color: theme.palette.info.light,
  },
  comment: {
    color: theme.palette.success.light,
  },
  input: {
    color: 'white',
    backgroundColor: '#222',
  },
}));

export default useStyles;
