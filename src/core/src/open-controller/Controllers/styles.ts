import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  controllerPane: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    top: 100,
    right: theme.spacing(1),
  },
}));

export default useStyles;
