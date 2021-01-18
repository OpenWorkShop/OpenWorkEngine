import {createMuiTheme} from '@material-ui/core/styles';
import {CSSProperties} from '@material-ui/styles';
const defaultTheme = createMuiTheme();

export const defaultBorderStyle = 'solid';
export const defaultBorderColor = defaultTheme.palette.divider;
export const defaultBorderWidth = 1;

export const borderTopCss: CSSProperties = {
  borderTopStyle: defaultBorderStyle,
  borderTopColor: defaultBorderColor,
  borderTopWidth: defaultBorderWidth,
};

export const borderBottomCss: CSSProperties = {
  borderBottomStyle: defaultBorderStyle,
  borderBottomColor: defaultBorderColor,
  borderBottomWidth: defaultBorderWidth,
};

export const borderAllCss: CSSProperties = {
  borderStyle: defaultBorderStyle,
  borderColor: defaultBorderColor,
  borderWidth: defaultBorderWidth,
};
