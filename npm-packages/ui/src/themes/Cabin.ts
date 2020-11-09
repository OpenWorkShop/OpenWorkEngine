import { createMuiTheme } from '@material-ui/core/styles';
import * as Colors from 'themes/Colors';

export default createMuiTheme({
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
