import * as React from 'react';
import { useTrans} from '../../Context';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ToolBar from './ToolBar';
import { Tooltip, Fab, useTheme } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './Styles';
import {IHaveWorkspace} from '../../Workspaces';
import {IHavePortStatus} from '../../Ports';
import GWiz from '../../GWiz';
import {useParams} from 'react-router-dom';
import useLogger from '../../../utils/logging/UseLogger';
import WorkspaceBar from '../../Workspaces/WorkspaceBar';

type Props = IHaveWorkspace & IHavePortStatus;

interface IParams {
  selectedToolGroupId?: string;
}

const Workspace: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(Workspace);
  const t = useTrans();
  const { workspace, port } = props;
  const theme = useTheme();
  const classes = useStyles();
  const params = useParams<IParams>();
  const { selectedToolGroupId } = params;

  log.verbose('workspace params', params);

  return (
    <GWiz
      domId={`gwiz-${workspace.id}`}
      header={<WorkspaceBar workspace={workspace} port={port} />}
      className={classes.visualizer}
    >
      <Tooltip title={t('Halt the machine immediately (emergency stop) and re-set the connection.')}>
        <Fab className={classes.actionButton} size="medium" >
          <FontAwesomeIcon icon={faExclamationCircle} size={'lg'} color={theme.palette.error.dark} />
        </Fab>
      </Tooltip>
      <ToolBar workspace={workspace} selectedToolGroupId={selectedToolGroupId} />
    </GWiz>
  );
};

export default Workspace;
