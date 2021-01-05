import { useLogger } from '../../utils/logging/UseLogger';
import React from 'react';
import {Route, Switch, useLocation } from 'react-router-dom';
import analytics from '../analytics';
import { Settings, Home, WorkspaceCreator, Docs, Workspace } from './';
import Navigation, { NotFound } from '../Navigation';
import BackendDisconnectedModal from '../Modals/BackendDisconnectedModal';
import _ from 'lodash';
import {
  IOpenControllerPackage,
  useOpenController,
  useOpenControllerSettings
} from '../Context';

interface IProps {
  currentWorkspaceId?: string;
}


const App: React.FunctionComponent<IProps> = (props) => {
  const log = useLogger(App);
  const openController = useOpenController();
  const settings: IOpenControllerPackage = useOpenControllerSettings();
  const productName: string = settings.productName;
  const workspaceIds = openController.workspaces.map(ws => ws.id);
  const { currentWorkspaceId } = props;
  const workspace = _.find(openController.workspaces, ws => ws.id === currentWorkspaceId);
  const location = useLocation();

  function toggleWorkspaceActiveFlags(activeWorkspaceId?: string) {
    openController.workspaces.forEach((ws) => {
      ws.isActive = Boolean(activeWorkspaceId && ws.id === activeWorkspaceId);
    });
  }

  function setPage(title: string, pathname: string) {
    document.title = title;
    analytics.trackPage(pathname);
    toggleWorkspaceActiveFlags(currentWorkspaceId);
  }

  React.useEffect(() => {
    log.verbose('app workspace', location.pathname, 'workspace', workspace?.id);

    if (workspace) {
      setPage(
        `${workspace.name} | ${productName}`,
        '/' + [workspace.connection.firmware.controllerType].join('/') + '/'
      );
    } else {
      setPage(productName, location.pathname);
    }
  }, [analytics, log, workspace, productName]);

  return (
    <Navigation workspace={workspace}>
      <BackendDisconnectedModal />
      <Switch>
        {workspaceIds.map((workspaceId) => {
          return (
            <Route exact key={workspaceId} path={`/workspaces/${workspaceId}/:selectedToolGroupId?`} >
              <Workspace id={workspaceId} />
            </Route>
          );
        })}
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/workspaces" component={WorkspaceCreator} />
        <Route exact path="/docs" component={Docs} />
        <Route exact path="/" component={Home} />
        <Route path="/" component={NotFound} />
      </Switch>
    </Navigation>
  );
};

export default App;
