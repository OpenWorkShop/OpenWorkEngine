import {Grid} from '@material-ui/core';
import WorkBar from '../WorkBar';
import * as React from 'react';
import {tryUseController} from '../Controllers';
import {IHaveWorkspace} from './types';
import {IMaybeHavePortStatus} from '../Ports';
import {tryUseGcodeVisualizer} from '../GWiz';
import {WorkspaceState} from '../graphql';

type Props = IHaveWorkspace & IMaybeHavePortStatus & {
 children?: React.ReactNode;
};

const WorkspaceBar: React.FunctionComponent<Props> = (props) => {
  const controller = tryUseController();
  const wiz = tryUseGcodeVisualizer();
  const { workspace, port, children } = props;

  return (
    <React.Fragment>
      <Grid container >
        <Grid item xs={12}>
          <WorkBar
            workspace={workspace}
            port={port}
            controller={controller}
            visualizerPreferences={workspace.state === WorkspaceState.Active ? wiz?.visualizerPreferences : undefined}
          />
        </Grid>
      </Grid>
      {children && children}
    </React.Fragment>
  );
};

export default WorkspaceBar;
