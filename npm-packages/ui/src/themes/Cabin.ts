import { createMuiTheme } from '@material-ui/core/styles';
import * as Colors from 'themes/Colors';

const theme = createMuiTheme({
  // props: {
  //   MuiTypography: {
  //     variantMapping: {
  //       h1: 'h2',
  //       h2: 'h2',
  //       h3: 'h2',
  //       h4: 'h2',
  //       h5: 'h2',
  //       h6: 'h2',
  //       subtitle1: 'h4',
  //       subtitle2: 'em',
  //       body1: 'span',
  //       body2: 'span',
  //     },
  //   },
  // },
  palette: {
    primary: Colors.brown,
    secondary: Colors.gold,
    background: {
      paper: '#fff',
      default: '#efefef',
    },
  },
  shape: {
    borderRadius: 1,
  },
  typography: {
    fontFamily: ['Cabin', 'sans-serif'].join(','),
  },
});

theme.typography.h3 = {
  'fontSize': '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

export default theme;
