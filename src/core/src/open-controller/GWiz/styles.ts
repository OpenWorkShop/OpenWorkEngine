import {makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((_: Theme) => ({
  root: {
    backgroundColor: 'red',
    width: '100%',
    minHeight: 200,
  },
}));

export default useStyles;
