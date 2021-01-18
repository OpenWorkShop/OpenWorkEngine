import * as React from 'react';
import { Grid } from '@material-ui/core';
import {ToolBase} from '../types';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {useLogger} from '../../../Hooks';

const Applicator: ToolBase = (props) => {
  const log = useLogger(Applicator);
  const { workspaceId } = props;
  const config = useWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.applicator);
  const status = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.applicator);

  log.debug('[APPLICATOR]', 'status', status, 'config', config);

  return (
    <Grid container>
      <Grid item xs={12}>
        {config.feedRate}
        {status.feedRate}
      </Grid>
    </Grid>
  );
};

export default Applicator;
