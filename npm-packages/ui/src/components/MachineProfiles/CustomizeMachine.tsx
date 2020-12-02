import {
  AxisName,
  MachineAxisPropsFragment,
  MachineFirmwareMinimalFragment,
  MachinePartCompleteFragment,
  MachineSearchResultFragment,
  useGetCompleteMachineProfileLazyQuery,
} from '@openworkshop/lib/api/graphql';
import _ from 'lodash';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import * as React from 'react';
import {
  ICustomizedMachine,
  ICustomizedMachineProfile,
  MachineAxes,
} from '@openworkshop/lib/api/Machines/CustomizedMachine';
import {owsClientOpts} from '@openworkshop/lib/consts';
import HoverHelpStep from '../Alerts/HoverHelpStep';
import ChooseMachineParts from './ChooseMachineParts';
import CreateMachineProfile from './CreateMachineProfile';
import MachineAxesEditor from './MachineAxesEditor';
import MachineProfileSearchBar from './MachineProfileSearchBar';
import { Grid, CircularProgress, Typography, Button, useTheme, Paper } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';

interface ICustomizeMachineProps {
  onCustomized: (machine?: ICustomizedMachine) => void;
  tip?: React.ReactNode;
}

const CustomizeMachine: React.FunctionComponent<ICustomizeMachineProps> = (props) => {
  const log = useLogger(CustomizeMachine);
  const { t } = useTranslation();
  const theme = useTheme();
  const [machineProfile, setMachineProfile] = React.useState<MachineSearchResultFragment | undefined>(undefined);
  const [getCompleteMachineProfile, { loading, error, data }] = useGetCompleteMachineProfileLazyQuery(owsClientOpts);
  const mp = data ? data.machineProfile : undefined;
  const loadedMachineProfile = !loading && machineProfile && mp && machineProfile.id === mp.id ? mp : undefined;
  const [customizedMachine, setCustomizedMachine] = React.useState<ICustomizedMachine | undefined>(undefined);
  const [searchMachines, setSearchMachines] = React.useState(true);

  React.useEffect(() => {
    if (
      loadedMachineProfile &&
      (!customizedMachine || customizedMachine.profile.machineProfileId !== loadedMachineProfile.id)
    ) {
      setCustomizedMachine({
        profile: {
          machineProfileId: loadedMachineProfile.id,
          brand: loadedMachineProfile.brand ?? undefined,
          model: loadedMachineProfile.model,
          submit: false,
        },
        name: loadedMachineProfile.name,
        icon: loadedMachineProfile.icon,
        firmware: loadedMachineProfile.firmware[0],
        parts: [],
        axes: loadedMachineProfile.axes,
        features: loadedMachineProfile.features,
        commands: loadedMachineProfile.commands,
      });
    }
  }, [customizedMachine, loadedMachineProfile]);

  if (error) log.error('load profile error', error.networkError);

  function onCustomized(machine?: ICustomizedMachine) {
    log.debug('customized machine', machine);
    setCustomizedMachine(machine);
    props.onCustomized(machine);
  }

  function onSelectedMachineProfile(mp: MachineSearchResultFragment | undefined) {
    log.debug('machine profile selection', mp);
    setMachineProfile(mp);
    onCustomized(undefined);

    if (mp && (!loadedMachineProfile || loadedMachineProfile.id !== mp.id)) {
      getCompleteMachineProfile({ variables: { id: mp.id } });
    }
  }

  function onCreatingMachineProfile(firmware: MachineFirmwareMinimalFragment, profile: ICustomizedMachineProfile) {
    const defaultAxis: MachineAxisPropsFragment = {
      id: '',
      name: AxisName.X,
      min: 0,
      max: 500,
      accuracy: 0.01,
      precision: 2,
    };
    onCustomized({
      firmware: {
        id: '',
        name: '',
        edition: '',
        requiredVersion: null,
        suggestedVersion: null,
        downloadUrl: null,
        helpUrl: null,
        ...firmware,
      },
      profile: profile,
      name: profile.model,
      icon: '',
      parts: [],
      axes: [ { ...defaultAxis }, { ...defaultAxis, name: AxisName.Y }, { ...defaultAxis, name: AxisName.Z } ],
      features: [],
      commands: [],
    });
  }

  function onCompletedParts(parts: MachinePartCompleteFragment[]) {
    log.debug('set parts', parts);
    // const cm: ICustomizedMachine = _.deepClone(customizedMachine);
    if (!customizedMachine) {
      log.error('missing machine');
      return;
    }
    onCustomized({ ...customizedMachine, parts: _.cloneDeep(parts) });
  }

  function onChangedAxes(axes: MachineAxes) {
    log.debug('set axes', axes);
    if (!customizedMachine) {
      log.error('missing machine');
      return;
    }
    onCustomized({ ...customizedMachine, axes: _.cloneDeep(Object.values(axes)) });
  }

  function startOver() {
    setMachineProfile(undefined);
    onCustomized(undefined);
  }

  const completedMsg = loadedMachineProfile ? t('Please review the defaults provided by the community catalog:')
    : t('This step has already been completed.');

  return (
    <Grid container spacing={2} style={{ marginBottom: theme.spacing(2) }}>
      <Grid item xs={12}>
        <Paper style={{ padding: theme.spacing(2), marginBottom: theme.spacing(2) }} >
          {searchMachines && <MachineProfileSearchBar onSelectedMachineProfile={onSelectedMachineProfile} />}
          <Grid container style={{ marginTop: theme.spacing(2) }} >
            <Grid item xs={12} md={9} style={{ marginTop: theme.spacing(1) }}>
              {!customizedMachine && searchMachines && props.tip && (
                <div>
                  <Typography variant='subtitle2'>{props.tip}</Typography>
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={3} style={{ textAlign: 'right' }}>
              <Button
                variant='outlined'
                onClick={() => (customizedMachine ? startOver() : setSearchMachines(!searchMachines))}
                style={{ marginLeft: theme.spacing(2) }}>
                {customizedMachine && <Trans>Start Over</Trans>}
                {!customizedMachine && searchMachines && <Trans>Can't find your machine?</Trans>}
                {!customizedMachine && !searchMachines && <Trans>Search the Community Catalog</Trans>}
              </Button>
            </Grid>
          </Grid>
          {!searchMachines && <CreateMachineProfile onChanged={onCreatingMachineProfile} />}
        </Paper>
      </Grid>
      {loading && (
        <Grid item xs={12}>
          <CircularProgress size={32} />
          <Typography variant='h5'>
            <Trans>Loading machine options...</Trans>
          </Typography>
        </Grid>
      )}
      {loadedMachineProfile && customizedMachine && (
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Trans>Parts & Options</Trans>
            <HoverHelpStep
              tip={t('Default parts are pre-selected below... but please change them if you have upgraded, modified, ' +
                'or used a non-standard kit.')}
              isComplete={!!customizedMachine}
            />
          </Typography>
          {customizedMachine && <Typography variant='subtitle2'>{completedMsg}</Typography>}
          {!customizedMachine && <Typography variant='subtitle2'>
            <Trans>Please check the options below.</Trans>
          </Typography>}
        </Grid>
      )}
      {loadedMachineProfile && customizedMachine && (
        <Grid item xs={12}>
          <ChooseMachineParts machineProfile={loadedMachineProfile} onComplete={onCompletedParts} />
        </Grid>
      )}
      {loadedMachineProfile && customizedMachine && (
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Trans>Axes (Size)</Trans>
            <HoverHelpStep
              tip={t('Each axis should have a minimum and maximum value, so Makerverse knows how far it can move.')}
              isComplete={!!customizedMachine}
            />
          </Typography>
          {customizedMachine && <Typography variant='subtitle2'>{completedMsg}</Typography>}
          {!customizedMachine && <Typography variant='subtitle2'>
            <Trans>Please confirm the dimensions of your machine.</Trans>
          </Typography>}
        </Grid>
      )}
      {customizedMachine && (
        <Grid item xs={12}>
          <MachineAxesEditor axes={_.keyBy(customizedMachine.axes, (a) => a.name)} onChanged={onChangedAxes} />
        </Grid>
      )}
    </Grid>
  );
};

export default CustomizeMachine;
