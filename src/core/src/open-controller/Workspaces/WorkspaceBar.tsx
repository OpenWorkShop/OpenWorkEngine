import {Grid} from '@material-ui/core';
import WorkBar from '../WorkBar';
import * as React from 'react';
import {tryUseController} from '../Controllers';
import {IHaveWorkspace} from './types';
import {IMaybeHavePortStatus} from '../Ports';
import {useLogger} from '../../Hooks';

type Props = IHaveWorkspace & IMaybeHavePortStatus & {
 children?: React.ReactNode;
};

const WorkspaceBar: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(WorkspaceBar);
  const controller = tryUseController();
  const { workspaceId, port, children } = props;

  log.debug('draw');

  return (
    <React.Fragment>
      <Grid container >
        <Grid item xs={12}>
          <WorkBar
            workspaceId={workspaceId}
            port={port}
            controller={controller}
          />
        </Grid>
      </Grid>
      {children && children}
    </React.Fragment>
  );
};

export default WorkspaceBar;
