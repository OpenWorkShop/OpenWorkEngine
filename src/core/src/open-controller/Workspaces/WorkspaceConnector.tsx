import * as React from 'react';
import ThreeColumns from '../../components/Layout/ThreeColumns';
import ToolbarCard from '../../components/Cards/ToolbarCard';
import PortConnectionSteps from '../Ports/PortConnectionSteps';
import {IHaveWorkspaceId} from './types';
import { Grid } from '@material-ui/core';
import {IMaybeHavePortStatus} from '../Ports';
import useLogger from '../../utils/logging/UseLogger';
import OpenWorkspaceButton from './OpenWorkspaceButton';
import {useWorkspace} from './Hooks';
import WorkBar from '../WorkBar';
import useStyles from './styles';

type Props = IHaveWorkspaceId & IMaybeHavePortStatus;

const WorkspaceConnector: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(WorkspaceConnector);
  const classes = useStyles();
  const { workspaceId, port } = props;
  const workspace = useWorkspace(workspaceId);

  log.verbose(port, workspace);

  return (
    <Grid container >
      <Grid item xs={12} className={classes.topBar}>
        <WorkBar
          workspaceId={workspaceId}
          port={port}
        />
      </Grid>

      <ThreeColumns size="md" >
        <ToolbarCard
          title={workspace.settings.name}
          footer={<OpenWorkspaceButton workspaceId={workspaceId} />}
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
    </Grid>
  );
};

export default WorkspaceConnector;
