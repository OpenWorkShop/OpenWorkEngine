import { makeStyles, Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles';

const padding = 2;

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
    justifyContent: 'center',
    margin: 0,
    backgroundColor: theme.palette.background.default,
  },
  root: {
    margin: theme.spacing(4),
    minWidth: 300,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(padding),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  centered: {
    textAlign: 'center',
    verticalAlign: 'center',
  },
}));

export default useStyles;