import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  formControl: {
    width: '100%',
  },
  selectMenuItem: {
    height: 24,
  },
  selectMenu: {
    height: 24,
  },
  selectIcon: {
    height: 24,
    width: 24,
    marginBottom: 0,
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
