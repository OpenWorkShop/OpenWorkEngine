import React from 'react';
import usePromise from 'react-promise-suspense';
import useLogger from '../utils/logging/UseLogger';
import {IHaveOpenControllerDeployment, ILazyRender, OpenControllerProvider, useOpenController} from './Context';
import OpenWorkShop from '../OpenWorkShop';
import {IOpenWorkShop} from '../types';

type Props = ILazyRender & {
  ows: IOpenWorkShop;
}

const ChildRenderer: React.FunctionComponent<Props> = (props) => {
  const { childRenderer, ows } = props;
  const oc = useOpenController();

  return <React.Fragment>{childRenderer ? childRenderer(ows, oc) : null}</React.Fragment>;
};

const ControllerMain: React.FunctionComponent<IHaveOpenControllerDeployment> = (props) => {
  const ows = React.useContext(OpenWorkShop);
  const log = useLogger(ControllerMain);
  const { childRenderer } = props;

  usePromise(async () => {
    while(!props.deployment.connection) {
      log.debug('[STARTUP]', 'awaiting connection...');
      await new Promise((r) => setTimeout(r, 100));
    }
  }, [props]);

  if (!props.deployment.connection) return <div>{'Error: No Connection'}</div>;

  return (
    <OpenControllerProvider
      deployment={props.deployment}
      connection={props.deployment.connection}
    >
      <ChildRenderer ows={ows} childRenderer={childRenderer} />
    </OpenControllerProvider>
  );
};

export default ControllerMain;