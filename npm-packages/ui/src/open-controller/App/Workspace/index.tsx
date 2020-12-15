import React, {FunctionComponent} from 'react';
import {useSystemPorts} from '../../Ports';
import {useWorkspace, useWorkspaceEvent} from '../../Context';
import {
  WorkspaceState
} from '@openworkshop/lib/api/graphql';
import WorkspaceConnector from './WorkspaceConnector';
import {WorkspaceEventType} from '../../Workspaces';
import ControllerProvider from '../../Controllers/ControllerProvider';
import Workspace from './Workspace';

interface OwnProps {
  id: string;
}

type Props = OwnProps;

const index: FunctionComponent<Props> = (props) => {
  const ports = useSystemPorts();
  const workspace = useWorkspace(props.id);
  const port = ports.portMap[workspace.connection.portName];

  useWorkspaceEvent(workspace, WorkspaceEventType.State);

  // Controls [Axes, Homing, Spindle/Laser, Hotend, Console(?)]
  // Project [Visualizer, Webcam, Gcode]
  // Settings [Machine Settings, Calibration, Probe, Test Laser, Edit Workspace]

  if (workspace.state !== WorkspaceState.Active || !workspace.machine)
    return <WorkspaceConnector workspaceId={props.id} port={port} />;

  return <ControllerProvider portName={port.portName} machine={workspace.machine} >
    {<Workspace port={port} workspace={workspace} />}
  </ControllerProvider>;
};

export default index;
