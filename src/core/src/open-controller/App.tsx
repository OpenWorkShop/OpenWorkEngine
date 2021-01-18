import { useLogger } from '../utils/logging/UseLogger';
import React from 'react';
import {Route, Switch, useLocation } from 'react-router-dom';
import analytics from './analytics';
import { Settings, Home, WorkspaceCreator, Docs } from './';
import Workspace from './Workspaces';
import Navigation, { NotFound } from './Navigation';
import BackendDisconnectedModal from './Modals/BackendDisconnectedModal';
import {IMaybeHaveWorkspace, tryUseWorkspace, useWorkspaceIds} from './Workspaces';
import {
  IOpenControllerPackage,
  useOpenControllerSettings
} from './Context';

type Props = IMaybeHaveWorkspace;

const App: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(App);
  const settings: IOpenControllerPackage = useOpenControllerSettings();
  const productName: string = settings.productName;
  const { workspaceId } = props;
  const workspace = tryUseWorkspace(workspaceId);
  const workspaceIds = useWorkspaceIds();
  const location = useLocation();

  function setPage(title: string, pathname: string) {
    document.title = title;
    analytics.trackPage(pathname);
  }

  React.useEffect(() => {
    log.verbose('app workspace', location.pathname, 'workspace', workspace?.id);

    if (workspace) {
      setPage(
        `${workspace.settings.name} | ${productName}`,
        '/' + [workspace.settings.connection.firmware.controllerType].join('/') + '/'
      );
    } else {
      setPage(productName, location.pathname);
    }
  }, [analytics, log, workspace, productName]);

  return (
    <Navigation workspaceId={workspace?.id}>
      <BackendDisconnectedModal />
      <Switch>
        {workspaceIds.map((workspaceId) => {
          return (
            <Route exact key={workspaceId} path={`/workspaces/${workspaceId}/:workspaceFeature?`} >
              <Workspace workspaceId={workspaceId} />
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
