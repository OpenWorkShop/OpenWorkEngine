import {BaudRate, ICustomizedMachineProfile, normalizeMachineControllerType} from '../Machines';
import {useLogger} from '../../utils/logging/UseLogger';
import React from 'react';
import {MachineCategory, MachineControllerType, MachineFirmwareMinimalFragment} from '../graphql';
import {
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import {useOwsTrans} from '../../hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      padding: theme.spacing(4),
    },
    formControl: {
      width: '100%',
      marginTop: theme.spacing(2),
    },
    headings: {
      marginBottom: theme.spacing(1),
    },
  }),
);

interface ICreateMachineProfileProps {
  onChanged: (firmware: MachineFirmwareMinimalFragment, profile: ICustomizedMachineProfile) => void;
}

type FirmwareKey = 'controllerType' | 'baudRate' | 'baudRateValue' | 'rtscts';
type ProfileKey = 'brand' | 'model' | 'submit';

const CreateMachineProfile: React.FunctionComponent<ICreateMachineProfileProps> = (props) => {
  const log = useLogger(CreateMachineProfile);
  const t = useOwsTrans();
  const controllerTypes = [MachineControllerType.Grbl, MachineControllerType.Marlin];
  //Object.keys(MachineControllerType);
  const baudRates = Object.values(BaudRate).filter((br) => typeof br === 'number');
  const classes = useStyles();

  const [firmware, setFirmware] = React.useState<MachineFirmwareMinimalFragment>({
    controllerType: MachineControllerType.Grbl,
    baudRate: 0,
    baudRateValue: 0,
    rtscts: false,
  });

  const [profile, setProfile] = React.useState<ICustomizedMachineProfile>({
    brand: '',
    model: '',
    category: MachineCategory.Cnc,
    submit: true,
  });

  const baudRate: number = (firmware.baudRateValue ) || 0;

  function onChange(fw: MachineFirmwareMinimalFragment, pr: ICustomizedMachineProfile) {
    pr = {
      ...pr, category: fw.controllerType === MachineControllerType.Marlin ? MachineCategory.Tdp : MachineCategory.Cnc
    };
    setFirmware(fw);
    setProfile(pr);
    log.verbose('update', fw, pr);
    if (fw.baudRateValue > 0) {
      props.onChanged(fw, pr);
    }
  }

  function updateFirmware<T extends string | number | boolean>(key: FirmwareKey, value: T) {
    onChange({ ...firmware, [key]: value }, profile);
  }

  function updateProfile<T extends string | boolean>(key: ProfileKey, value: T) {
    onChange(firmware, { ...profile, [key]: value });
  }

  log.verbose(firmware, profile);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Typography variant='h5' className={classes.headings}>
          {t('Connection Protocol')}
        </Typography>
        <ToggleButtonGroup
          exclusive
          value={firmware.controllerType}
          onChange={(e, v) => !!v && updateFirmware('controllerType', v)}>
          {controllerTypes.map((ct) => {
            if (ct === MachineControllerType.Unknown) return null;
            return (
              <ToggleButton key={ct} value={normalizeMachineControllerType(ct)}>
                {ct}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
        <FormControl className={classes.formControl} error={!baudRate}>
          <InputLabel shrink id='baud-rate-label'>
            {t('Baud Rate')}
          </InputLabel>
          <Select
            id='baud-rate'
            displayEmpty
            value={baudRate}
            onChange={(e) => {
              updateFirmware('baudRate', Number(e.target.value));
              updateFirmware('baudRateValue', Number(e.target.value));
            }}>
            <MenuItem value={0}>
              <em>
                {t('None')}
              </em>
            </MenuItem>
            {baudRates.map((br) => {
              return (
                <MenuItem key={`${br}`} value={br}>
                  {br}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>
            {t('Required')}
          </FormHelperText>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox checked={firmware.rtscts} onChange={() => updateFirmware('rtscts', !firmware.rtscts)} />
          }
          label={t('Hardware flow control (rtscts)?')}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h5' className={classes.headings}>
          {t('Machine Information')}
          <Grid container spacing={1} >
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  label={t('Brand')}
                  value={profile.brand}
                  onChange={(e) => updateProfile('brand', e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  label={t('Model')}
                  value={profile.model}
                  onChange={(e) => updateProfile('model', e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={profile.submit} onChange={() => updateProfile('submit', !profile.submit)} />
                }
                label={t('Submit to community catalog?')}
              />
            </Grid>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CreateMachineProfile;
