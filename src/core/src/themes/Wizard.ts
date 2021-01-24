import { createMuiTheme } from '@material-ui/core/styles';
import Colors from './Colors';
import 'typeface-roboto';
import 'typeface-cabin';
import { backgroundImage, getImageUrl } from '../components/Images';
import {toolbarHeight} from './consts';

const headerFont = 'Cabin';
const bodyFont = 'Cabin';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: Colors.purple,
    secondary: Colors.gold,
    background: {
      paper: '#fff',
      default: '#f8f8f8',
    },
  },
  shape: {
    borderRadius: 3,
  },
  mixins: {
    toolbar: {
      ...defaultTheme.mixins.toolbar,
      color: Colors.brown.contrastText,
      backgroundColor: Colors.brown.main,
      fontWeight: 'bold',
      backgroundImage: getImageUrl(backgroundImage.base64),
      height: toolbarHeight,
      minHeight: toolbarHeight,
      [defaultTheme.breakpoints.up('sm')]: {
        height: toolbarHeight,
        minHeight: toolbarHeight,
      }
    }
  },
  typography: {
    fontFamily: [bodyFont, headerFont, 'sans-serif'].join(','),
    h1: {
      fontFamily: headerFont,
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
