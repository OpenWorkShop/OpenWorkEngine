import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import usePromise from 'react-promise-suspense';
import OpenControllerProvider from './Context/OpenControllerProvider';
import {IOpenControllerMain} from './types';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import {IHaveOpenControllerDeployment} from './Context';

const ControllerMain: React.FunctionComponent<IHaveOpenControllerDeployment> = (props) => {
  const log = useLogger(ControllerMain);

  usePromise(async () => {
    while(!props.deployment.connection) {
      log.debug('[STARTUP]', 'awaiting connection...');
      await new Promise((r) => setTimeout(r, 100));
    }
  }, [props]);

  if (!props.deployment.connection) return <div>{'Error: No Connection'}</div>;

  return (
    <Router >
      <CssBaseline />
      <OpenControllerProvider
        deployment={props.deployment}
        connection={props.deployment.connection}
      />
    </Router>
  );
};

export default ControllerMain;
