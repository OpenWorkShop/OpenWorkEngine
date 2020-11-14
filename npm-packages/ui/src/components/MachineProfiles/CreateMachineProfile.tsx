import { ICustomizedMachineProfile } from '@openworkshop/lib/api/Machines/CustomizedMachine';
import { useLogger } from '@openworkshop/lib/utils/logging/UseLogger';
import React from 'react';
import { MachineControllerType, MachineFirmwareMinimalFragment } from '@openworkshop/lib/api/graphql';
import {
  Typography,
  Paper,
  useTheme,
  Grid,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { normalizeMachineControllerType } from '@openworkshop/lib/api/Machines/MachineControllerType';
import { BaudRate } from '@openworkshop/lib/api/Machines/BaudRate';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

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

type FirmwareKey = 'controllerType' | 'baudRate' | 'rtscts';
type ProfileKey = 'brand' | 'model' | 'submit';

const CreateMachineProfile: React.FunctionComponent<ICreateMachineProfileProps> = (props) => {
  const log = useLogger(CreateMachineProfile);
  const { t } = useTranslation();
  const theme = useTheme();
  const controllerTypes = Object.keys(MachineControllerType);
  const baudRates = Object.values(BaudRate).filter((br) => typeof br === 'number');
  const classes = useStyles();

  const [firmware, setFirmware] = React.useState<MachineFirmwareMinimalFragment>({
    controllerType: MachineControllerType.Grbl,
    baudRate: 0,
    rtscts: false,
  });

  const [profile, setProfile] = React.useState<ICustomizedMachineProfile>({
    brand: '',
    model: '',
    submit: true,
  });

  const isUntested =
    firmware.controllerType === MachineControllerType.Smoothie ||
    firmware.controllerType === MachineControllerType.TinyG;
  const baudRate: number = (firmware.baudRate as number) || 0;

  function onChange(fw: MachineFirmwareMinimalFragment, pr: ICustomizedMachineProfile) {
    setFirmware(fw);
    setProfile(pr);
    log.debug('update', fw, pr);
    if (fw.baudRate > 0) {
      props.onChanged(fw, pr);
    }
  }

  function updateFirmware<T extends string | number | boolean>(key: FirmwareKey, value: T) {
    onChange({ ...firmware, [key]: value }, profile);
  }

  function updateProfile<T extends string | boolean>(key: ProfileKey, value: T) {
    onChange(firmware, { ...profile, [key]: value });
  }

  log.trace(firmware, profile);

  return (
    <div>
      <Typography variant='h5'>
        <Trans>Connect to your Machine</Trans>
      </Typography>

      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={6}>
            <Typography variant='h5' className={classes.headings}>
              <Trans>Connection Protocol</Trans>
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={firmware.controllerType}
              onChange={(e, v) => v && updateFirmware('controllerType', v)}>
              {controllerTypes.map((ct) => {
                return (
                  <ToggleButton key={ct} value={normalizeMachineControllerType(ct)}>
                    {ct}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
            {isUntested && (
              <div style={{ margin: theme.spacing(4) }}>
                <em>
                  <Trans>
                    <strong>Warning</strong>: this protocol is not fully-tested.
                  </Trans>
                </em>
              </div>
            )}
            <FormControl className={classes.formControl} error={!baudRate}>
              <InputLabel shrink id='baud-rate-label'>
                <Trans>Baud Rate</Trans>
              </InputLabel>
              <Select
                id='baud-rate'
                displayEmpty
                value={baudRate}
                onChange={(e) => updateFirmware('baudRate', Number(e.target.value))}>
                <MenuItem value={0}>
                  <em>
                    <Trans>None</Trans>
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
                <Trans>Required</Trans>
              </FormHelperText>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox checked={firmware.rtscts} onChange={(e) => updateFirmware('rtscts', !firmware.rtscts)} />
              }
              label={t('Hardware flow control (rtscts)?')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='h5' className={classes.headings}>
              <Trans>Machine Information</Trans>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Brand')}
                    value={profile.brand}
                    onChange={(e) => updateProfile('brand', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Model')}
                    value={profile.model}
                    onChange={(e) => updateProfile('model', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={profile.submit} onChange={(e) => updateProfile('submit', !profile.submit)} />
                    }
                    label={t('Submit to community catalog?')}
                  />
                </Grid>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CreateMachineProfile;
