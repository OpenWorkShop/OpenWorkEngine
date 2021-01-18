import { makeStyles } from '@material-ui/core/styles';

export const menuSize = 36;
export const iconSize = 24;

const useStyles = makeStyles(() => ({
  root: {
  },
  formControl: {
    width: '100%',
  },
  selectMenuItem: {
    height: menuSize,
  },
  selectMenu: {
    height: menuSize,
  },
  selectIcon: {
    height: iconSize,
    width: iconSize,
  },
}));

export default useStyles;
