import {makeStyles, Theme} from '@material-ui/core/styles';
import 'typeface-roboto-mono';
import {getLogLevelColor} from '../../Machines';
import {MachineLogLevel} from '../../graphql';

const codeFont = 'Roboto Mono';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#222',
    color: 'white',
    fontFamily: codeFont,
    fontSize: '1rem',
  },
  history: {
    overflowY: 'scroll',
    maxHeight: 150,
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      maxHeight: 300,
    },
    borderWidth: theme.spacing(0.5),
    borderColor: '#000',
    borderStyle: 'solid',
  },
  prompt: {
    fontWeight: 'bold',
    color: getLogLevelColor(MachineLogLevel.Dbg, theme),
    textAlign: 'right',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  code: {
    color: theme.palette.info.light,
  },
  comment: {
    color: theme.palette.success.light,
  },
  altRow: {
    color: 'white',
    backgroundColor: '#444',
    padding: theme.spacing(1),
  },
  input: {
    fontFamily: codeFont,
    color: 'white',
  },
  inputFormControl: {
    margin: 0,
    padding: 0,
  },
  modalButton: {
    color: theme.palette.secondary.light,
    minWidth: 32,
    position: 'relative',
    bottom: 2,
  },
}));

export default useStyles;
