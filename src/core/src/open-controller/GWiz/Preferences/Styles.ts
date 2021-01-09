import { makeStyles, Theme } from '@material-ui/core/styles';

export const colorButtonSize = 24;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  colorLabel: {
    float: 'left',
  },
  colorButton: {
    width: colorButtonSize,
    minWidth: colorButtonSize,
    height: colorButtonSize,
  },
}));

export default useStyles;
