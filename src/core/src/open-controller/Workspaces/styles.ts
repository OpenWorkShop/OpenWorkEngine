import { makeStyles, Theme } from '@material-ui/core/styles';
import {borderBottomCss, workBarHeight} from '../../themes';

export const toolBarSize = 44;
export const toolBarHeight = 44;
const tabSize = 44;

const maxWidth = 320;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2),
    marginTop: 80,
  },
  topBar: {
    ...borderBottomCss,
    backgroundColor: theme.palette.background.paper,
  },
  warningBar: {
    backgroundColor: theme.palette.error.dark,
  },
  errorBar: {
    backgroundColor: theme.palette.warning.dark,
  },
  bottomBar: {
    padding: 8,
    zIndex: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
    width: '100%',
    margin: theme.spacing(1),
  },
  toolBarPaper: {
    // display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  toolBar: {
    // height: controlBarHeight,
    // position: 'fixed',
    padding: theme.spacing(0),
    // margin: theme.spacing(2),
    position: 'fixed',
    // bottom: 0,
    right: theme.spacing(1),
  },
  toolBarSide: {
    top: 168,
    maxWidth: maxWidth, // Make space for right column, but keep ToolPane the same size.
  },
  toolBarBottom: {
    bottom: theme.spacing(1),
    maxWidth: maxWidth,
  },
  toolPaper: {
    padding: theme.spacing(0),
    maxHeight: '50vh',
    // maxWidth: maxWidth * 10 / 12,
    // display: 'flex',
  },
  tabs: {
    width: '100%',
  },
  tabSide: {
    padding: 0,
    width: '100%',
    height: toolBarSize,
  },
  tabBottom: {
    maxHeight: tabSize,
    minHeight: tabSize,
    width: '100%',
  },
  workspace: {
    height: `calc(100vh - ${Number(theme.mixins.toolbar.height)}px)`,
  },
  visualizer: {
    height: `calc(100vh - ${workBarHeight + Number(theme.mixins.toolbar.height)}px)`,
  },
  dialog: {
    padding: 0,
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

  titleBar: {
    ...borderBottomCss,
    backgroundColor: theme.palette.background.paper,
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
  settingsTab: {
    minWidth: 150,
  }
}));

export default useStyles;
