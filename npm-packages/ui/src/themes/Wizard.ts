import { createMuiTheme } from '@material-ui/core/styles';
import * as Colors from './Colors';
import 'typeface-roboto';
import 'typeface-cabin';

const headerFont = 'Cabin';
const bodyFont = 'Roboto';

const theme = createMuiTheme({
  palette: {
    primary: Colors.purple,
    secondary: Colors.brown,
    background: {
      paper: '#fff',
      default: '#efefef',
    },
  },
  shape: {
    borderRadius: 3,
  },
  // mixins: {
  //   toolbar: {
  //     backgroundColor: Colors.brown.dark,
  //     color: Colors.brown.contrastText,
  //     fontWeight: 'bold',
  //   }
  // },
  typography: {
    fontFamily: [bodyFont, headerFont, 'sans-serif'].join(','),
    h1: {
      fontFamily: headerFont,
      // menu bar...
      fontSize: '1.5rem',
    },
    h2: {
      fontFamily: headerFont,
      fontSize: '2.2rem',
    },
    h3: {
      fontFamily: headerFont,
      fontSize: '2.5rem',
    },
    h4: {
      fontSize: '2rem',
      fontFamily: headerFont,
    },
    h5: {
      fontSize: '1.5rem',
      fontFamily: headerFont,
    },
    h6: {
      fontSize: '1.1rem',
      fontFamily: headerFont,
    },
    button: {
      fontFamily: headerFont,
    },
    body1: {
      fontFamily: bodyFont,
    },
    body2: {
      fontFamily: bodyFont,
    },
    subtitle1: {
      fontFamily: bodyFont,
      fontWeight: 'bold',
    },
    subtitle2: {
      fontFamily: bodyFont,
      fontStyle: 'italic',
    },
  },
});

export default theme;
