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
} from '@material-ui/core';
import { Trans } from 'react-i18next';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { normalizeMachineControllerType } from '@openworkshop/lib/api/Machines/MachineControllerType';
import { BaudRate } from '@openworkshop/lib/api/Machines/BaudRate';

interface ICreateMachineProfileProps {
  onChanged: (firmware: MachineFirmwareMinimalFragment, profile: ICustomizedMachineProfile) => void;
}

type FirmwareKey = 'controllerType' | 'baudRate' | 'rtscts';
type ProfileKey = 'brand' | 'model' | 'submit';

const CreateMachineProfile: React.FunctionComponent<ICreateMachineProfileProps> = (props) => {
  const log = useLogger(CreateMachineProfile);
  const theme = useTheme();
  const controllerTypes = Object.keys(MachineControllerType);
  const baudRates = Object.values(BaudRate).filter((br) => typeof br === 'number');

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

  function updateFirmware<T extends string | number>(key: FirmwareKey, value: T) {
    onChange({ ...firmware, [key]: value }, profile);
  }

  function updateProfile<T extends string | number>(key: ProfileKey, value: T) {
    onChange(firmware, { ...profile, [key]: value });
  }

  log.trace(firmware, profile);

  return (
    <div>
      <Typography variant='h5'>
        <Trans>Connect to your Machine</Trans>
      </Typography>

      <Paper style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4), padding: theme.spacing(4) }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={6}>
            <Typography variant='h6'>
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
            <FormControl style={{ width: '100%', marginTop: theme.spacing(2) }}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='h6'>
              <Trans>Machine Information</Trans>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CreateMachineProfile;
