import React from 'react';
import {IOpenController, IOpenControllerPackage} from './types';
import OpenControllerContext from './OpenControllerContext';
import {BackendConnection, BackendConnectionEvent, ConnectionState} from '../../api';
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

export interface IWindowSize {
  width: number,
  height: number,
}

// Hook
export function useWindowSize(): IWindowSize {
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
