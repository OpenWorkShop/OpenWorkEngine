import {
  AxisName,
  MachineAxisPropsFragment,
  MachineFirmwareMinimalFragment,
  MachineSearchResultFragment,
  useGetCompleteMachineProfileLazyQuery,
} from '../graphql';
import _ from 'lodash';
import useLogger from '../../utils/logging/UseLogger';
import * as React from 'react';
import {
  ICustomizedMachine,
  ICustomizedMachineProfile,
  MachineAxes,
} from '../Machines/CustomizedMachine';
import {owsClientOpts} from '../../consts';
import ChooseMachineParts from './ChooseMachineParts';
import CreateMachineProfile from './CreateMachineProfile';
import MachineAxesEditor from './MachineAxesEditor';
import MachineProfileSearchBar from './MachineProfileSearchBar';
import { Grid, CircularProgress, Typography, Button, useTheme, Paper } from '@material-ui/core';
import {useOwsTrans} from '../../hooks';
import HelpfulHeader from '../../components/Text/HelpfulHeader';

import {IMachinePartChoice} from '../Machines/CustomizedMachine';

interface ICustomizeMachineProps {
  onCustomized: (machine?: ICustomizedMachine) => void;
  tip?: React.ReactNode;
}

const CustomizeMachine: React.FunctionComponent<ICustomizeMachineProps> = (props) => {
  const log = useLogger(CustomizeMachine);
  const t = useOwsTrans();
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
          category: loadedMachineProfile.machineCategory,
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
    log.verbose('customized machine', machine);
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

  function onCompletedParts(parts: IMachinePartChoice[]) {
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
          <Grid container spacing={2} style={{ marginTop: theme.spacing(2) }} >
            <Grid item xs={12} sm={7} style={{ marginTop: theme.spacing(1) }}>
              {!customizedMachine && searchMachines && props.tip && (
                <div>
                  <Typography variant='subtitle2'>{props.tip}</Typography>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={5} style={{ textAlign: 'right' }}>
              <Button
                variant='outlined'
                onClick={() => (customizedMachine ? startOver() : setSearchMachines(!searchMachines))}
                style={{ marginLeft: theme.spacing(2) }}
              >
                {customizedMachine && t('Start Over')}
                {!customizedMachine && searchMachines && t('Can\'t find your machine?')}
                {!customizedMachine && !searchMachines && t('Search the Community Catalog')}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {!searchMachines && <CreateMachineProfile onChanged={onCreatingMachineProfile} />}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {loading && (
        <Grid item xs={12}>
          <CircularProgress size={32} />
          <Typography variant='h5'>
            {t('Loading machine options...')}
          </Typography>
        </Grid>
      )}
      {loadedMachineProfile && customizedMachine && (
        <Grid item xs={12}>
          <HelpfulHeader
            tip={t('Default parts are pre-selected below... but please change them if you have upgraded, modified, ' +
            'or used a non-standard kit.')}
            title={t('Parts & Options')}
            isComplete={!!customizedMachine}
          />
          {loadedMachineProfile && <Typography variant='subtitle2'>{completedMsg}</Typography>}
          {!loadedMachineProfile && <Typography variant='subtitle2'>
            {t('Please check the options below.')}
          </Typography>}
        </Grid>
      )}
      {loadedMachineProfile && customizedMachine && (
        <Grid item xs={12}>
          <ChooseMachineParts parts={loadedMachineProfile.parts} onComplete={onCompletedParts} />
        </Grid>
      )}
      {customizedMachine && (
        <Grid item xs={12}>
          <HelpfulHeader
            title={t('Axes (Size)')}
            tip={t('Each axis should have a minimum and maximum value, so Makerverse knows how far it can move.')}
            isComplete={!!customizedMachine}
          />
          {customizedMachine && <Typography variant='subtitle2'>{completedMsg}</Typography>}
          {!customizedMachine && <Typography variant='subtitle2'>
            {t('Please confirm the dimensions of your machine.')}
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
