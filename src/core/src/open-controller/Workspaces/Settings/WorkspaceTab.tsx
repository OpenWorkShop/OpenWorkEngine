import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Paper
} from '@material-ui/core';
import * as React from 'react';
import useStyles from '../styles';
import {IHaveWorkspace} from '../types';
import {useTrans} from '../../Context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import useLogger from '../../../utils/logging/UseLogger';
import {useCloseWorkspaceMutation, useDeleteWorkspaceMutation} from '../../graphql';
import {Redirect} from 'react-router-dom';
import {AlertList, IAlertMessage} from '../../../components/Alerts';
import HelpfulHeader from '../../../components/Text/HelpfulHeader';
import {useWorkspaceSelector} from '../hooks';

type Props = IHaveWorkspace;

const WorkspaceTab: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(WorkspaceTab);
  const classes = useStyles();
  const { workspaceId } = props;
  const settings = useWorkspaceSelector(workspaceId, s => s.settings);
  const [preferImperial, setPreferImperial] = React.useState(settings.preferImperial);
  const [autoReconnect, setAutoReconnect] = React.useState(settings.autoReconnect);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteWorkspace, deletedWorkspace] = useDeleteWorkspaceMutation();
  const [closeWorkspace] = useCloseWorkspaceMutation();
  const [error, setError] = React.useState<IAlertMessage>();

  async function onAcceptDeleteWorkspace() {
    log.debug('delete', workspaceId);
    setDeleteDialogOpen(false);
    try {
      const variables = { workspaceId };
      await deleteWorkspace({ variables });
    } catch (e) {
      log.error(e, 'Deleting workspace');
      setError(e);
    }
  }

  async function onPressCloseWorkspace() {
    try {
      const variables = { workspaceId };
      await closeWorkspace({ variables });
    } catch (e) {
      log.error(e, 'Closing workspace');
      setError(e);
    }
  }

  if (deletedWorkspace && deletedWorkspace.data) {
    log.debug('deleted', deletedWorkspace);
    return <Redirect to="/workspaces" />;
  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <AlertList errors={[error, deletedWorkspace?.error]} />
      </Grid>
      <Grid item xs={12} md={7}>
        <HelpfulHeader
          tip={t('Makerverse stores the settings file at $HOME/.makerverse.')}
          title={t('Preferences')}
          variant="subtitle1"
        />
        <Paper className={classes.paper}>
          <FormControl className={classes.formControl}>
            <FormControlLabel
              control={<Checkbox checked={preferImperial} onChange={() => setPreferImperial(!preferImperial)} />}
              label={t('I prefer imperial (inches) to metric (mm)')}
            />
          </FormControl>
          <div className={classes.formSpacer} />
          <FormControl className={classes.formControl}>
            <FormControlLabel
              control={<Checkbox checked={autoReconnect} onChange={() => setAutoReconnect(!autoReconnect)} />}
              label={t('Automatically (re)connect to the machine when the workspace is opened.')}
            />
          </FormControl>
        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <HelpfulHeader
          tip={t('Workspaces grant access to your machine!')}
          title={t('Danger Zone')}
          variant="subtitle1"
        />
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <Button className={classes.closeButton} onClick={onPressCloseWorkspace} >
                  <FontAwesomeIcon icon={faWindowClose} />
                  &nbsp;
                  {t('Close Workspace')}
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <Button className={classes.deleteButton} onClick={() => setDeleteDialogOpen(true)} >
                  <FontAwesomeIcon icon={faTrash} />
                  &nbsp;
                  {t('Delete Workspace')}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('Delete Workspace?')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Are you sure? This cannot be undone!')}
            <br /><br />
            {t('Most operational parameters (e.g., calibration) are stored on-device and are not affected by workspace deletion.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t('No')}</Button>
          <Button onClick={onAcceptDeleteWorkspace} autoFocus>{t('Yes')}</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default WorkspaceTab;
