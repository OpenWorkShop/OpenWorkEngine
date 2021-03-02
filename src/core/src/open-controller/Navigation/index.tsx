import React, {FunctionComponent} from 'react';
import HeaderBar from './HeaderBar';
import SideDrawer from './SideDrawer';
import useStyles from './styles';
import useLogger from '../../utils/logging/UseLogger';
import {IMaybeHaveWorkspace} from '../Workspaces';

export { default as NotFound } from './NotFound';
export { default as BackendDisconnectedModal } from './BackendDisconnectedModal';
export { default as ReconnectRedirect } from './ReconnectRedirect';

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps & IMaybeHaveWorkspace;

const Navigation: FunctionComponent<Props> = (props) => {
  const log = useLogger(Navigation);
  const classes = useStyles();
  const { workspaceId } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  log.verbose('menus');

  return (
    <div className={classes.root}>
      <HeaderBar workspaceId={ workspaceId } toggleDrawerOpen={() => setDrawerOpen(!drawerOpen)} />
      <SideDrawer isOpen={drawerOpen} setOpen={setDrawerOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};


export default Navigation;
