import { Button, Tooltip } from '@material-ui/core';
import * as React from 'react';
import { IMoveRequest } from './types';
import useStyles from './styles';
import OpenWorkShopIcon from '../../../components/OpenWorkShopIcon';
import {useTrans} from '../../Context';

type Props = {
  moveRequest: IMoveRequest;
  move: (req: IMoveRequest) => Promise<void>;
};

const JogButton: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const classes = useStyles();
  const { moveRequest, move } = props;

  function getIcon() {
    const parts = ['move'];
    if (moveRequest.y && moveRequest.y < 0) parts.push('down');
    if (moveRequest.y && moveRequest.y > 0) parts.push('up');
    if (moveRequest.x && moveRequest.x < 0) parts.push('left');
    if (moveRequest.x && moveRequest.x > 0) parts.push('right');
    if (moveRequest.z && moveRequest.z < 0) parts.push('in');
    if (moveRequest.z && moveRequest.z > 0) parts.push('out');
    if (parts.length === 1) {
      if (moveRequest.x !== undefined || moveRequest.y !== undefined) parts.push('center');
      if (moveRequest.z !== undefined) parts.push('zero');
    }
    return <OpenWorkShopIcon className={classes.jogAxisIcon} name={parts.join('-')} />;
  }

  function getTip() {
    const parts = [];
    if (moveRequest.y && moveRequest.y < 0) parts.push(t('downward (negative Y)'));
    if (moveRequest.y && moveRequest.y > 0) parts.push(t('upward (positive Y)'));
    if (moveRequest.x && moveRequest.x < 0) parts.push(t('leftward (negative X)'));
    if (moveRequest.x && moveRequest.x > 0) parts.push(t('rightward (positive X)'));
    if (moveRequest.z && moveRequest.z < 0) parts.push(t('inward (negative Z)'));
    if (moveRequest.z && moveRequest.z > 0) parts.push(t('outward (positive Z)'));
    if (parts.length === 0) {
      if (moveRequest.x !== undefined || moveRequest.y !== undefined) parts.push(t('to the X/Y center'));
      if (moveRequest.z !== undefined) parts.push(t('to the surface'));
    }
    return t('Move the tip {{ directions }}.', { directions: parts.join(' and ') } );
  }

  return (
    <Tooltip title={getTip()}>
      <Button
        color="primary"
        variant="outlined"
        className={classes.jogAxisButton}
        onClick={() => move(moveRequest)}
      >
        {getIcon()}
      </Button>
    </Tooltip>
  );
};

export default JogButton;
