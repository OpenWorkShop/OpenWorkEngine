import _ from 'lodash';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import React, { FunctionComponent } from 'react';
import {Redirect, Route, Switch, useLocation, Link } from 'react-router-dom';
import {useOpenWorkShop } from '@openworkshop/lib';
import { BackendConnection } from '@openworkshop/lib/api';
import {
  StartupFragment,
  EssentialSettingsFragment,
  OpenControllerSessionFragment,
  useWorkspaceChangeSubscription,
  WorkspaceFullFragment,
  WorkspaceState,
} from '@openworkshop/lib/api/graphql';
import {
  IOpenController,
  OpenControllerContext,
} from '../Context';
import { LoginPage, CallbackPage } from '../Login';
import i18next, { StringMap } from 'i18next';
import { Workspace } from '../Workspaces';
import {AppState} from '../redux';
import ProtectedApp from '../App/ProtectedApp';
import { useSelector } from 'react-redux';
import { User } from 'oidc-client';
import SystemPortProvider from '../Ports/SystemPortProvider';
import {IOpenControllerPackage} from './types';

const workspaceObjects: { [key: string]: Workspace } = {};

interface IProps {
  deployment: IOpenControllerPackage;
  connection: BackendConnection;
}

const OpenControllerProvider: FunctionComponent<IProps> = (props) => {
  const log = useLogger(OpenControllerProvider);
  const ows = useOpenWorkShop();
  const onWorkspaceChanged = useWorkspaceChangeSubscription();
  const { connection, deployment } = props;
  const location = useLocation();
  const [workspaceFragments, setWorkspaceFragments] = React.useState<WorkspaceFullFragment[]>([]);
  const [settings, setSettings] = React.useState<EssentialSettingsFragment | undefined>(undefined);
  const [session, setSession] = React.useState<OpenControllerSessionFragment | undefined>(undefined);

  const user = useSelector<AppState, User | undefined>((state) => state.oidc.user);

  // Load/unload workspaces
  const currentWorkspaceIds = workspaceFragments.map(ws => ws.id);
  const previousWorkspaceIds = Object.keys(workspaceObjects);
  const newWorkspaceIds = _.difference(currentWorkspaceIds, previousWorkspaceIds);
  const removedWorkspaceIds = _.difference(previousWorkspaceIds, currentWorkspaceIds);

  removedWorkspaceIds.forEach(id => {
    log.debug('unload workspace', id);
    delete workspaceObjects[id];
  });

  newWorkspaceIds.forEach(id => {
    const frag = _.find(workspaceFragments, r => r.id === id);
    if (frag) {
      log.debug('load workspace', id);
      workspaceObjects[id] = new Workspace(ows, frag);
    } else {
      log.error('missing workspace', id);
    }
  });

  const workspaces = Object.values(workspaceObjects);
  const wsPrefix = '/workspaces/';
  const path = location.pathname;
  const currentWorkspaceId = path.startsWith(wsPrefix) ? path.substring(wsPrefix.length) : undefined;

  // Apply subscription mutations
  React.useEffect(() => {
    if (settings && onWorkspaceChanged.data && onWorkspaceChanged.data.workspace) {
      const workspaceFragment: WorkspaceFullFragment = onWorkspaceChanged.data.workspace;

      const changedWorkspaceId = workspaceFragment.id;
      const newFragments = [...workspaceFragments];

      if (workspaceFragment.state === WorkspaceState.Deleted) {
        const ei = _.findIndex(newFragments, ws => ws.id === changedWorkspaceId);
        if (ei >= 0) {
          newFragments.splice(ei, 1);
          log.debug('[WORKSPACE]', 'delete', changedWorkspaceId, workspaceFragment, newFragments);
          setWorkspaceFragments(newFragments);
        }
      } else if (_.has(workspaceObjects, changedWorkspaceId)) {
        log.debug('[WORKSPACE]', 'update', changedWorkspaceId, workspaceFragment);
        workspaceObjects[changedWorkspaceId].updateRecord(workspaceFragment);
      } else {
        log.debug('[WORKSPACE]', 'add', changedWorkspaceId, workspaceFragment);
        newFragments.push(workspaceFragment);
        setWorkspaceFragments(newFragments);
      }
    }
  }, [workspaceObjects, onWorkspaceChanged]);

  function t(key: string, opts?: StringMap): string {
    return ows.t(key, opts);
  }

  // Set up the IMakerverse interface for the .Provider...
  const makerverse: IOpenController = { deployment, ows, connection, session, workspaces, t };

  function onLoaded(session: OpenControllerSessionFragment, startup: StartupFragment) {
    log.debug('loaded', 'session', !!session, 'settings', !!startup);
    setSession(session);
    setSettings(startup.settings);
    setWorkspaceFragments(startup.workspaces);
  }

  return (
    <OpenControllerContext.Provider value={makerverse} >
      <SystemPortProvider >
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/callback' component={CallbackPage} />
          {user && <Route path='/' >
            <ProtectedApp
              token={user.access_token}
              onLoaded={onLoaded}
              currentWorkspaceId={currentWorkspaceId}
            />
          </Route>}
          {!user && <Route path='/'>
            <Redirect to="/login" />
          </Route>}
        </Switch>
      </SystemPortProvider>
    </OpenControllerContext.Provider>
  );
};

export default OpenControllerProvider;
