import {controllersSlice} from '../Controllers';
import React, {FunctionComponent} from 'react';
import {useSystemPorts} from '../Ports';
import {
  ControlledMachineFragment,
  WorkspaceState
} from '../graphql';
import ControllerProvider from '../Controllers/ControllerProvider';
import Workspace from './Workspace';
import {useDispatch} from 'react-redux';
import {useLogger} from '../../hooks';
import {IHaveWorkspace} from './types';
import {useWorkspaceSelector} from './hooks';
import WorkspaceConnector from './WorkspaceConnector';
export { default as WorkspaceStatus } from './WorkspaceStatus';
export { default as WorkspaceConnector } from './WorkspaceConnector';
export { default as WorkspaceUnitSelect } from './WorkspaceUnitSelect';
export { default as workspacesSlice } from './slice';
export * from './types';
export * from './hooks';

type Props = IHaveWorkspace;

const Index: FunctionComponent<Props> = (props) => {
  const ports = useSystemPorts();
  const log = useLogger(Index);
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
      log.debug('update machine', machine);
      dispatch(controllersSlice.actions.updateControlledMachine(machine));
    }
  }, [machine, controllersSlice]);

  return <ControllerProvider portName={portName} >
    {!workspaceReady && <WorkspaceConnector workspaceId={workspaceId} port={port}/>}
    {workspaceReady && <Workspace workspaceId={workspaceId} port={port} />}
  </ControllerProvider>;
};

export default Index;
