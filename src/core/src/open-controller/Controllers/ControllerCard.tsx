import React, { FunctionComponent } from 'react';
import {CardHeader, Card, CardContent} from '@material-ui/core';
import {IHaveWorkspace, tryUseWorkspaceController} from '../Workspaces';
import ControlBar from './ControlBar';
import useStyles from './styles';

type Props = IHaveWorkspace;

const ControllerCard: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { workspaceId } = props;
  const controller = tryUseWorkspaceController(workspaceId);
  const activeState = controller?.machine.status.activityState;

  return (
    <Card className={classes.controllerPane} >
      <CardHeader
        title={activeState?.toString() ?? '?'}
      />
      <CardContent>
        Content
      </CardContent>
    </Card>
  );
};

export default ControllerCard;
