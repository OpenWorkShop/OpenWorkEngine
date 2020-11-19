import { Theme } from '@material-ui/core';
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles';
import { backgroundImage, getImageUrl } from '../components/Images';

export const headerBarPlain = (theme: Theme): CreateCSSProperties => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontWeight: 'bold',
});

export const headerBar = (theme: Theme): CreateCSSProperties => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontWeight: 'bold',
  backgroundImage: getImageUrl(backgroundImage.base64),
});
