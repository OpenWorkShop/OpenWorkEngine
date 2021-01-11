import * as React from 'react';
import {useTrans} from '../../Context';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import ToolBar from './ToolBar';
import {Tooltip, Fab, useTheme} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import useStyles from './Styles';
import {IHavePortStatus} from '../../Ports';
import GWiz  from '../../GWiz';
import {useParams} from 'react-router-dom';
import useLogger from '../../../utils/logging/UseLogger';
import {WorkspaceBar, useWorkspace, IHaveWorkspace, useWorkspaceSelector} from '../../Workspaces';

type Props = IHaveWorkspace & IHavePortStatus;

interface IParams {
  selectedToolGroupId?: string;
}

const Workspace: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(Workspace);
  const t = useTrans();
  const {workspaceId, port} = props;
  const axes = useWorkspaceSelector(workspaceId, ws => ws.settings.axes);

  const theme = useTheme();
  const classes = useStyles();
  const params = useParams<IParams>();
  const {selectedToolGroupId} = params;

  log.debug('render gwiz', workspaceId, port, axes, params);

  return (
    <div className={classes.visualizer} >
      <WorkspaceBar workspaceId={workspaceId} port={port} />
      <GWiz id={workspaceId} className={classes.visualizer} axes={axes} />
      <Tooltip title={t('Halt the machine immediately (emergency stop) and re-set the connection.')}>
        <Fab className={classes.actionButton} size="medium">
          <FontAwesomeIcon icon={faExclamationCircle} size={'lg'} color={theme.palette.error.dark}/>
        </Fab>
      </Tooltip>
      <ToolBar workspaceId={workspaceId} selectedToolGroupId={selectedToolGroupId}/>
    </div>
  );
};

export default Workspace;
