import * as React from 'react';
import ThreeColumns from '../../components/Layout/ThreeColumns';
import ToolbarCard from '../../components/Cards/ToolbarCard';
import {IHaveWorkspaceId} from './types';
import {Grid, Typography} from '@material-ui/core';
import {IMaybeHavePortStatus, PortConnectionSteps} from '../Ports';
import useLogger from '../../utils/logging/UseLogger';
import OpenWorkspaceButton from './OpenWorkspaceButton';
import {useWorkspace} from './hooks';
import WorkBar from '../WorkBar';
import useStyles from './styles';
import {WorkspaceState} from '../graphql';
import {useTrans} from '../Context';

type Props = IHaveWorkspaceId & IMaybeHavePortStatus;

const WorkspaceConnector: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(WorkspaceConnector);
  const classes = useStyles();
  const { workspaceId, port } = props;
  const workspace = useWorkspace(workspaceId);
  const isDisconnected = workspace.state === WorkspaceState.Disconnected;

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
          className={classes.floatingCard}
          title={workspace.settings.name}
          footer={<OpenWorkspaceButton workspaceId={workspaceId} />}
        >
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8} style={{ justifyContent: 'center' }}>
              {isDisconnected && <div>
                <Typography>
                  {t('The port is not available for use.')}
                </Typography>
              </div>}
              {!isDisconnected && <PortConnectionSteps port={port} />}
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </ToolbarCard>
      </ThreeColumns>
    </Grid>
  );
};

export default WorkspaceConnector;
