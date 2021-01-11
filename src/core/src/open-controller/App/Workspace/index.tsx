import React, {FunctionComponent} from 'react';
import {useSystemPorts} from '../../Ports';
import {
  ControlledMachineFragment,
  WorkspaceState
} from '../../graphql';
import {WorkspaceConnector, IHaveWorkspace, useWorkspace, useWorkspaceSelector} from '../../Workspaces';
import Workspace from './Workspace';
import ControllerProvider from '../../Controllers/ControllerProvider';

type Props = IHaveWorkspace;

const index: FunctionComponent<Props> = (props) => {
  const ports = useSystemPorts();
  const { workspaceId } = props;
  const workspaceState = useWorkspaceSelector(workspaceId, ws => ws.state);
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);
  const port = ports.portMap[portName];
  const machine: ControlledMachineFragment | undefined = port.connection?.machine;
  //
  // // Local cache of port object to force updates.
  // const [port, setPort] = React.useState<PortStatusFragment>();
  //
  // React.useEffect(() => {
  //   if (port?.portName !== portName) {
  //     setPort(ports.portMap[portName]);
  //   }
  // }, [portName, port, setPort]);

  // useWorkspaceEvent(workspace, WorkspaceEventType.State);

  // Controls [Axes, Homing, Spindle/Laser, Hotend, Console(?)]
  // Project [Visualizer, Webcam, Gcode]
  // Settings [Machine Settings, Calibration, Probe, Test Laser, Edit Workspace]

  if (workspaceState !== WorkspaceState.Active || !machine) {
    return <WorkspaceConnector workspaceId={workspaceId} port={port}/>;
  }

  // return <Workspace port={port} workspaceId={workspaceId} />;

  return <ControllerProvider portName={port.portName} machine={machine} >
    {<Workspace port={port} workspaceId={workspaceId} />}
  </ControllerProvider>;
};

export default index;
