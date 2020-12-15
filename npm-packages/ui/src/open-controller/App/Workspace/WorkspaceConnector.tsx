import * as React from 'react';
import ThreeColumns from '../../../components/Layout/ThreeColumns';
import ToolbarCard from '../../../components/Cards/ToolbarCard';
import PortConnectionSteps from '../../Ports/PortConnectionSteps';
import {IHaveWorkspaceId} from '../../Workspaces';
import {useWorkspace} from '../../Context';
import { Grid } from '@material-ui/core';
import {IMaybeHavePortStatus} from '../../Ports';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import OpenWorkspaceButton from './OpenWorkspaceButton';
import WorkspaceBar from './WorkspaceBar';
import {useSystemPorts} from '../../Ports';

type Props = IHaveWorkspaceId & IMaybeHavePortStatus;

const WorkspaceConnector: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(WorkspaceConnector);
  const { workspaceId } = props;
  const ports = useSystemPorts();
  const workspace = useWorkspace(workspaceId);
  const portName = workspace.connection.portName;
  const port = ports.portMap[portName];

  return (
    <WorkspaceBar workspace={workspace} port={port}>
      <ThreeColumns size="md" >
        <ToolbarCard
          title={workspace.name}
          footer={<OpenWorkspaceButton workspace={workspace} />}
        >
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8} style={{ justifyContent: 'center' }}>
              <PortConnectionSteps port={port} />
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </ToolbarCard>
      </ThreeColumns>
    </WorkspaceBar>
  );
};

export default WorkspaceConnector;
