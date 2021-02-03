import { CSSProperties } from '@material-ui/styles';
import { borderBottomCss, borderTopCss } from './borders';

export const altBackgroundColor: CSSProperties = {
  backgroundColor: '#f6f6f6',
};

export const rowDefaultCss: CSSProperties = {
  ...borderTopCss,
  ...borderBottomCss,
};

export const rowAlternateCss: CSSProperties = {
  ...rowDefaultCss,
  ...altBackgroundColor,
};

