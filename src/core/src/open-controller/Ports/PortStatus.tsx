import useLogger from '../../utils/logging/UseLogger';
import React, {FunctionComponent} from 'react';
import {PortState} from '../graphql';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Typography, useTheme} from '@material-ui/core';
import {IMaybeHavePortStatus} from './types';
import {getPortColor, getPortStatusText, getPortIcon} from './Ports';

interface OwnProps {
  showType?: boolean;
  showName?: boolean;
}

type Props = IMaybeHavePortStatus & OwnProps;

const PortStatus: FunctionComponent<Props> = (props) => {
  const log = useLogger(PortStatus);
  const theme = useTheme();
  const { port, showType, showName } = props;
  const portName = port ? port.portName : undefined;
  const st = port ? port.state : PortState.Unplugged;

  const color = getPortColor(port);
  log.verbose('port', portName, 'status', st);

  return (
    <React.Fragment >
      {showType && port && port.connection && <Typography variant="subtitle1">
        [{port.connection.machine.firmwareRequirement.controllerType}]
      </Typography>}
      {showName && port && port.portName && <Typography variant="subtitle2">
        {port.portName}
      </Typography>}
      <FontAwesomeIcon color={color} icon={ getPortIcon(port) } style={{ marginRight: theme.spacing(0.5) }} />
      {' '}{getPortStatusText(port)}
    </React.Fragment>
  );
};

export default PortStatus;
