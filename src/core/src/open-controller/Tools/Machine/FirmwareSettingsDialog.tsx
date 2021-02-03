import React, {FunctionComponent} from 'react';
import _ from 'lodash';
import {
  FirmwareSettingChangeInput,
  FirmwareSettingPolymorphicFragment,
  FirmwareSettingsTypedFragment, useSetFirmwareSettingsMutation,
} from '../../graphql';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';
import {useTrans} from '../../Context';
import useStyles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faTrash, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {useLogger} from '../../../hooks';
import HelpfulHeader from '../../../components/Text/HelpfulHeader';
import {FirmwareSettingsGroupName, hasSettingChanged} from '../../Machines';
import FirmwareSettingsGroup from './FirmwareSettingsGroup';
import {useControllerInstructions} from '../../Controllers/hooks';
import {IHaveWorkspace} from '../../Workspaces';

type Props = IHaveWorkspace & {
  settings: FirmwareSettingsTypedFragment;
  open: boolean;
  onClose: () => void;
};

const FirmwareSettingsDialog: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(FirmwareSettingsDialog);
  const { settings, open, onClose, workspaceId } = props;
  const title = t('Firmware Settings');
  const classes = useStyles();
  const groups: FirmwareSettingsGroupName[] =
    Object.keys(settings).filter(v => !v.startsWith('_')).map(s => s as FirmwareSettingsGroupName);
  const [ saveMutation, saveResults ] = useControllerInstructions(workspaceId, useSetFirmwareSettingsMutation());
  const [ changeSet, setChangeSet ] = React.useState<FirmwareSettingChangeInput[]>([]);
  const changedIds = Object.keys(changeSet);
  const numChanges = changedIds.length;
  const canSaveChanges = numChanges > 0 && !saveResults.loading;

  const tip = t('These settings live in the on-board memory. They control the way the machine behaves.');
  log.verbose('render', groups, settings);

  function onSettingChanged(setting: FirmwareSettingPolymorphicFragment, value: string) {
    const changed = hasSettingChanged(setting, value);

    const cs = [ ...changeSet ];
    const id = setting.id;
    const existingIdx = _.findIndex(cs, change => change.id === id);
    if (changed) {
      if (existingIdx >= 0) cs[existingIdx].value = value;
      else cs.push({ id, value });
    } else if (existingIdx >= 0) {
      cs.splice(existingIdx, 1);
    } else {
      log.warn('Unable to delete existing change');
    }

    log.debug(changed ? 'change' : 'unchanged', setting.id, '@', existingIdx,
      'from', setting.value, 'to', value, 'change set:', cs);
    setChangeSet(cs);
  }

  async function saveChanges() {
    const variables = { workspaceId, changeSet };
    const res = await saveMutation({ variables });
    if (res.data?.controller.results?.length) setChangeSet([]);
    log.debug('save settings', res);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby={title}
    >
      <DialogTitle className={classes.dialogHeader}>
        <Toolbar>
          <HelpfulHeader tip={tip} title={title} />
        </Toolbar>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Typography variant="h6">
                {t('These are read directly from your machine\'s board. ')}
              </Typography>
              <Typography variant="body1">
                {t(
                  'They should be calibrated once for your machine (and changed rarely thereafter).'
                )}
              </Typography>
              <br />
              <Typography variant="subtitle2">
                {t(
                  'These values might need to be manually changed if your configuration does not match the defaults. ' +
                  'The most common examples would be if you customized the dimensions, changed a part, or built your own machine. ' +
                'When in doubt, refer to your manufacturer\'s instructions.')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {groups.map((groupName) =>
              <FirmwareSettingsGroup
                key={groupName}
                groupName={groupName}
                settings={settings[groupName].settings}
                onSettingChanged={onSettingChanged}
              />)
            }
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogFooter}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth={true}>
              <Button color="secondary" variant="contained" onClick={onClose} >
                <FontAwesomeIcon icon={faWindowClose} />
                &nbsp;
                {t('Close Window')}
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth={true}>
              <Button variant="contained" className={classes.resetButton} >
                <FontAwesomeIcon icon={faTrash} />
                &nbsp;
                {t('Reset to Defaults')}
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth={true}>
              <Button
                color="primary"
                variant="contained"
                onClick={saveChanges}
                disabled={!canSaveChanges}
              >
                <FontAwesomeIcon icon={faSave} />
                &nbsp;
                {t('Save Changes')}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default FirmwareSettingsDialog;
