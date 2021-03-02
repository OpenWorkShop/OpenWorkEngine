import React, {FunctionComponent} from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import {getPortColor, getPortIcon, getPortStatusText} from './Ports';
import {IHavePortStatus} from './types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

type Props = IHavePortStatus;

const PortTip: FunctionComponent<Props> = (props) => {
  const { port } = props;
  const tip = getPortStatusText(port);
  const icon = getPortIcon(port);
  const color = getPortColor(port);

  return (
    <Tooltip title={tip}>
      <IconButton aria-label={tip} size='small' disableFocusRipple>
        <FontAwesomeIcon color={color} icon={icon} />
      </IconButton>
    </Tooltip>
  );
};

export default PortTip;
