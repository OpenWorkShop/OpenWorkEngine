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
import ChooseMachineParts from './ChooseMachineParts';
import CreateMachineProfile from './CreateMachineProfile';
import MachineAxesEditor from './MachineAxesEditor';
import MachineProfileSearchBar from './MachineProfileSearchBar';
import { Grid, CircularProgress, Typography, Button, useTheme } from '@material-ui/core';
import { Trans } from 'react-i18next';

interface ICustomizeMachineProps {
  onCustomized: (machine?: ICustomizedMachine) => void;
  tip?: React.ReactNode;
}

const CustomizeMachine: React.FunctionComponent<ICustomizeMachineProps> = (props) => {
  const log = useLogger(CustomizeMachine);
  const theme = useTheme();
  const [machineProfile, setMachineProfile] = React.useState<MachineSearchResultFragment | undefined>(undefined);
  const [getCompleteMachineProfile, { loading, error, data }] = useGetCompleteMachineProfileLazyQuery();
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
        axes: _.keyBy(loadedMachineProfile.axes, (a) => a.name),
        features: loadedMachineProfile.features,
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
      firmware: firmware,
      profile: profile,
      name: profile.model,
      icon: '',
      parts: [],
      axes: { X: { ...defaultAxis }, Y: { ...defaultAxis, name: AxisName.Y }, Z: { ...defaultAxis, name: AxisName.Z } },
      features: [],
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
    onCustomized({ ...customizedMachine, axes: _.cloneDeep(axes) });
  }

  function startOver() {
    setMachineProfile(undefined);
    onCustomized(undefined);
  }

  return (
    <Grid container spacing={2} style={{ marginBottom: theme.spacing(2) }}>
      <Grid item xs={12}>
        {searchMachines && <MachineProfileSearchBar onSelectedMachineProfile={onSelectedMachineProfile} />}
        <div style={{ marginTop: theme.spacing(1) }}>
          <Button
            variant='outlined'
            onClick={() => (customizedMachine ? startOver() : setSearchMachines(!searchMachines))}
            style={{ marginLeft: theme.spacing(2), float: 'right' }}>
            {customizedMachine && <Trans>Start Over</Trans>}
            {!customizedMachine && searchMachines && <Trans>Can't find your machine?</Trans>}
            {!customizedMachine && !searchMachines && <Trans>Search the Community Catalog</Trans>}
          </Button>
          {!customizedMachine && searchMachines && props.tip && (
            <div>
              <Typography variant='subtitle2'>{props.tip}</Typography>
            </div>
          )}
        </div>
        {!searchMachines && <CreateMachineProfile onChanged={onCreatingMachineProfile} />}
      </Grid>
      {loading && (
        <Grid item xs={12}>
          <CircularProgress size={32} />
          <Trans>Loading machine options...</Trans>
        </Grid>
      )}
      {loadedMachineProfile && (
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Trans>Customize your Machine</Trans>
          </Typography>
          <Typography variant='subtitle2'>
            <Trans>
              Default parts are pre-selected below... but please change them if you have upgraded, modified, or used a
              non-standard kit.
            </Trans>
          </Typography>
        </Grid>
      )}
      {loadedMachineProfile && customizedMachine && (
        <Grid item xs={12}>
          <ChooseMachineParts machineProfile={loadedMachineProfile} onComplete={onCompletedParts} />
        </Grid>
      )}
      {customizedMachine && (
        <Grid item xs={12}>
          <MachineAxesEditor axes={customizedMachine.axes} onChanged={onChangedAxes} />
        </Grid>
      )}
    </Grid>
  );
};

export default CustomizeMachine;
