import { useLogger } from '@openworkshop/lib/utils/logging/UseLogger';
import React from 'react';
import { MachineControllerType } from '@openworkshop/lib/api/graphql';
import { Typography, Paper, useTheme, Grid, Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
import { Trans } from 'react-i18next';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { normalizeMachineControllerType } from '@openworkshop/lib/api/Machines/MachineControllerType';
import { BaudRate } from '@openworkshop/lib/api/Machines/BaudRate';
const CreateMachineProfile = (props) => {
    const log = useLogger(CreateMachineProfile);
    const theme = useTheme();
    const controllerTypes = Object.keys(MachineControllerType);
    const baudRates = Object.values(BaudRate).filter(br => typeof (br) === 'number');
    const [firmware, setFirmware] = React.useState({
        controllerType: MachineControllerType.Grbl,
        baudRate: 0,
        rtscts: false,
    });
    const [profile, setProfile] = React.useState({
        brand: '',
        model: '',
        submit: true,
    });
    const isUntested = firmware.controllerType === MachineControllerType.Smoothie ||
        firmware.controllerType === MachineControllerType.TinyG;
    const baudRate = firmware.baudRate || 0;
    function onChange(fw, pr) {
        setFirmware(fw);
        setProfile(pr);
        log.debug('update', fw, pr);
        if (fw.baudRate > 0) {
            props.onChanged(fw, pr);
        }
    }
    function updateFirmware(key, value) {
        onChange(Object.assign(Object.assign({}, firmware), { [key]: value }), profile);
    }
    function updateProfile(key, value) {
        onChange(firmware, Object.assign(Object.assign({}, profile), { [key]: value }));
    }
    log.trace(firmware, profile);
    return (React.createElement("div", null,
        React.createElement(Typography, { variant: "h5" },
            React.createElement(Trans, null, "Connect to your Machine")),
        React.createElement(Paper, { style: { marginTop: theme.spacing(4), marginBottom: theme.spacing(4), padding: theme.spacing(4) } },
            React.createElement(Grid, { container: true, spacing: 2 },
                React.createElement(Grid, { item: true, xs: 12, sm: 9, md: 6 },
                    React.createElement(Typography, { variant: "h6" },
                        React.createElement(Trans, null, "Connection Protocol")),
                    React.createElement(ToggleButtonGroup, { exclusive: true, value: firmware.controllerType, onChange: (e, v) => v && updateFirmware('controllerType', v) }, controllerTypes.map(ct => {
                        return React.createElement(ToggleButton, { key: ct, value: normalizeMachineControllerType(ct) }, ct);
                    })),
                    isUntested && React.createElement("div", { style: { margin: theme.spacing(4) } },
                        React.createElement("em", null,
                            React.createElement(Trans, null,
                                React.createElement("strong", null, "Warning"),
                                ": this protocol is not fully-tested."))),
                    React.createElement(FormControl, { style: { width: '100%', marginTop: theme.spacing(2) } },
                        React.createElement(InputLabel, { shrink: true, id: "baud-rate-label" },
                            React.createElement(Trans, null, "Baud Rate")),
                        React.createElement(Select, { id: "baud-rate", displayEmpty: true, value: baudRate, onChange: (e) => updateFirmware('baudRate', Number(e.target.value)) },
                            React.createElement(MenuItem, { value: 0 },
                                React.createElement("em", null,
                                    React.createElement(Trans, null, "None"))),
                            baudRates.map(br => {
                                return React.createElement(MenuItem, { key: `${br}`, value: br }, br);
                            })),
                        React.createElement(FormHelperText, null,
                            React.createElement(Trans, null, "Required")))),
                React.createElement(Grid, { item: true, xs: 12, sm: 6, md: 4 },
                    React.createElement(Typography, { variant: "h6" },
                        React.createElement(Trans, null, "Machine Information")))))));
};
export default CreateMachineProfile;
//# sourceMappingURL=CreateMachineProfile.js.map