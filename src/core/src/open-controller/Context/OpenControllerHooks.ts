import _ from 'lodash';
import React from 'react';
import {IOpenController, IOpenControllerPackage} from './types';
import OpenControllerContext from './OpenControllerContext';
import { BackendConnection, BackendConnectionEvent, ConnectionState } from '../../api';
import {Workspace, IWorkspaceEvent, WorkspaceEventType} from '../Workspaces';
import {TTranslateFunc} from '../../types';

export function useOpenController(): IOpenController {
  return React.useContext(OpenControllerContext);
}

export function useTrans(): TTranslateFunc {
  return useOpenController().t;
}

export function useOpenControllerSettings(): IOpenControllerPackage {
  return useOpenController().deployment;
}

export function useDocumentationUrl(path: string): string {
  const home = useOpenControllerSettings().homepage;
  if (!path.startsWith('/') && !home.endsWith('/')) path = `/${path}`;
  return `${home}${path}`;
}

export function useWorkspace(workspaceId: string): Workspace {
  const openController = React.useContext(OpenControllerContext); // must happen despite early return in order to obey hooks
  const workspace: Workspace | undefined = _.find(openController.workspaces, ws => ws.id === workspaceId);
  if (!workspace) throw new Error(`No workspace for: ${workspaceId}`);
  return workspace;
}

export function tryUseWorkspace(workspaceId?: string): Workspace | undefined {
  const openController = React.useContext(OpenControllerContext); // must happen despite early return in order to obey hooks
  if (!workspaceId) return undefined;
  return _.find(openController.workspaces, ws => ws.id === workspaceId);
}

export function useWorkspaceEvent(workspace: Workspace, type: WorkspaceEventType): IWorkspaceEvent | undefined {
  const [event, setEvent] = React.useState<IWorkspaceEvent | undefined>(undefined);

  React.useEffect(() => {
    workspace.on(type.toString(), setEvent);

    return function cleanup() {
      workspace.off(type.toString(), setEvent);
    };
  }, [workspace, type, event, setEvent]);

  return event;
}

// Get notified when the backend connection (to Makerverse) state changes.
export function useBackendConnectionState(): ConnectionState {
  const openController: IOpenController = React.useContext(OpenControllerContext);
  const conn: BackendConnection = openController.connection;
  const [state, setState] = React.useState<ConnectionState>(conn.state);
  const eventName = BackendConnectionEvent.ConnectionStateChanged.toString();
  React.useEffect(() => {
    conn.on(eventName, setState);

    return function cleanup() {
      conn.off(eventName, setState);
    };
  }, [conn]);
  return state;
}

// Hook
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
