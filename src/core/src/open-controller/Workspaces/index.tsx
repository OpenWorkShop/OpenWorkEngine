import {controllersSlice} from '../Controllers';
import React, {FunctionComponent} from 'react';
import {useSystemPorts} from '../Ports';
import {
  ControlledMachineFragment,
  WorkspaceState
} from '../graphql';
import {WorkspaceConnector, IHaveWorkspace, useWorkspaceSelector} from '../Workspaces';
import ControllerProvider from '../Controllers/ControllerProvider';
import Workspace from './Workspace';
import {useDispatch} from 'react-redux';

export { default as WorkspaceStatus } from './WorkspaceStatus';
export { default as WorkspaceConnector } from './WorkspaceConnector';
export { default as WorkspaceUnitSelect } from './WorkspaceUnitSelect';
export { default as workspacesSlice } from './slice';
export * from './types';
export * from './hooks';

type Props = IHaveWorkspace;

const index: FunctionComponent<Props> = (props) => {
  const ports = useSystemPorts();
  const { workspaceId } = props;
  const dispatch = useDispatch();
  const workspaceState = useWorkspaceSelector(workspaceId, ws => ws.state);
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);
  const port = ports.portMap[portName];
  const machine: ControlledMachineFragment | undefined = port?.connection?.machine;
  const workspaceReady = workspaceState === WorkspaceState.Active && machine;

  // When the connector connects, save the initial machine state.
  React.useEffect(() => {
    if (machine) {
      dispatch(controllersSlice.actions.updateControlledMachine(machine));
    }
  }, [machine, controllersSlice]);

  return <ControllerProvider portName={port.portName} >
    {!workspaceReady && <WorkspaceConnector workspaceId={workspaceId} port={port}/>}
    {workspaceReady && <Workspace workspaceId={workspaceId} port={port} />}
  </ControllerProvider>;
};

export default index;
