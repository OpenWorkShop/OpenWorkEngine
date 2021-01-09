import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  dialog: {
    padding: 0,
  },
  formControl: {
    width: '100%',
  },
  formSpacer: {
    width: '100%',
    height: theme.spacing(1),
  },
  connectionButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  connectIcon: {
    width: 48,
    height: 48,
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
  },
  titleBar: {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.divider,
    borderBottomStyle: 'solid',
    padding: theme.spacing(0.5),
    textAlign: 'left',
    verticalAlign: 'middle',
  },
  machinePosition: {
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  titleBarCenter: {
    flexGrow: 1,
    verticalAlign: 'middle',
    paddingTop: 1,
    color: theme.palette.grey.A700,
    display: 'inline-block',
  },
  titleBarButtonGroup: {
    marginRight: theme.spacing(0.5),
  },
  titleBarButton: {
    padding: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  selectIcon: {
    height: 24,
    width: 24,
    marginBottom: 0,
    marginRight: theme.spacing(1),
  },
  dialogHeader: {
    padding: 0,
  },
  dialogContent: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.default,
    minHeight: 400,
  },
  dialogFooter: {
    justifyContent: 'center',
    margin: 0,
    backgroundColor: theme.palette.grey.A100,
  },
  deleteButton: {
    backgroundColor: theme.palette.error.dark,
    color: 'white',
  },
  closeButton: {
    backgroundColor: theme.palette.warning.dark,
    color: 'white',
  },
  selectMenuItem: {
    height: 24,
  },
  selectMenu: {
    height: 24,
  },
}));

export default useStyles;