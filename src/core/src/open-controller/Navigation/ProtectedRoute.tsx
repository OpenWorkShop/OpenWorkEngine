import useLogger from '../../utils/logging/UseLogger';
import React, { FunctionComponent } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {IOpenController, useOpenController} from '../Context';

interface OwnProps {
  path: string;
  component: React.ComponentClass<unknown, unknown> | React.FunctionComponent<unknown>;
}

type Props = OwnProps;

const ProtectedRoute: FunctionComponent<Props> = (props) => {
  const log = useLogger(ProtectedRoute);
  const openController: IOpenController = useOpenController();

  if (openController?.session?.user) {
    return <Route path={props.path} component={props.component} />;
  }

  const redirectFrom = window.location.pathname;
  const redirectTo = '/login';
  if (redirectFrom === redirectTo) {
    return null;
  }

  log.debug(`Redirect from "${redirectFrom}" to "${redirectTo}"`);

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: {
          from: props.path,
        },
      }}
    />
  );
};

export default ProtectedRoute;
