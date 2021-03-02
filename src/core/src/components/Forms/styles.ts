import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const menuSize = 32;
export const iconSize = 24;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  formControl: {
    width: '100%',
  },
  selectMenuItem: {
    height: menuSize,
    verticalAlign: 'middle',
  },
  selectMenu: {
    height: menuSize,
  },
  selectTitle: {
    // height: menuSize,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: menuSize,
  },
  selectIcon: {
    height: iconSize,
    width: iconSize,
    marginRight: theme.spacing(0.5),
  },
}));

export default useStyles;
