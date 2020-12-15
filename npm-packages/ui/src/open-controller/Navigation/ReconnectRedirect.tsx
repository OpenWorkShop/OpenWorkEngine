import React, { FunctionComponent } from 'react';
import usePromise from 'react-promise-suspense';
import { Redirect } from 'react-router-dom';
import {useOpenController} from '../Context';

interface OwnProps {
  to: string;
}

type Props = OwnProps;

const ReconnectRedirect: FunctionComponent<Props> = (props) => {
  const openController = useOpenController();
  const { connection } = openController;

  usePromise(async () => await connection.reconnect(), [connection]);

  return (<Redirect to={props.to} />);
};

export default ReconnectRedirect;
