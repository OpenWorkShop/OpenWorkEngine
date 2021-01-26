import {Fab, FormControl, Grid, Typography} from '@material-ui/core';
import {faPlug} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import useStyles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  useCloseWorkspaceMutation,
  useOpenWorkspaceMutation,
  WorkspaceState
} from '../graphql';
import {AlertList, IAlertMessage} from '../../components/Alerts';
import {useTrans} from '../Context';
import {IHaveWorkspace} from './types';
import useLogger from '../../utils/logging/UseLogger';
import {useWorkspaceSelector} from './hooks';
import {useDispatch} from 'react-redux';
import workspacesSlice from './slice';

const OpenWorkspaceButton: React.FunctionComponent<IHaveWorkspace> = (props) => {
  const log = useLogger(OpenWorkspaceButton);
  const t = useTrans();
  const dispatch = useDispatch();

  const { workspaceId } = props;

  const wsState = useWorkspaceSelector(workspaceId, ws => ws.state);

  // Mutations
  const variables = { workspaceId };
  const [error, onError] = React.useState<IAlertMessage | undefined>(undefined);
  const opts = { variables, onError };
  const [openMutation, openResult] = useOpenWorkspaceMutation(opts);
  const [closeMutation] = useCloseWorkspaceMutation(opts);

  // React to workspace changes by dispatching state.
  const loadedWorkspace = openResult.data?.workspace;
  React.useEffect(() => {
    if (loadedWorkspace) dispatch(workspacesSlice.actions.updateWorkspace(loadedWorkspace));
  }, [loadedWorkspace]);

  const classes = useStyles();
  const isConnecting = wsState === WorkspaceState.Opening || openResult.loading;
  const canConnect = !isConnecting && [WorkspaceState.Closed, WorkspaceState.Error].includes(wsState);
  const isDisabled = !isConnecting && !canConnect;

  log.debug('[OPEN]', 'workspace', workspaceId, wsState, isConnecting, canConnect);

  async function onClick() {
    return await (isConnecting ? closeMutation() : openMutation());
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <Fab
            color='primary'
            type='submit'
            variant='extended'
            size='large'
            onClick={onClick}
            className={classes.connectionButton}
            disabled={isDisabled}
          >
            <FontAwesomeIcon className={classes.connectIcon} icon={faPlug} />
            <Typography variant="h6">{isConnecting ? t('Cancel') : t('Connect')}</Typography>
          </Fab>
        </FormControl>
      </Grid>
      {error && <Grid item xs={12}>
        <AlertList error={error} />
      </Grid>}
    </Grid>
  );
};

export default OpenWorkspaceButton;
