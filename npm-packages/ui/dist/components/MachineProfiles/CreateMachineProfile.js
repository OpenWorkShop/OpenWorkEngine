import { useLogger } from '@openworkshop/lib/utils/logging/UseLogger';
import React from 'react';
import { MachineControllerType } from '@openworkshop/lib/api/graphql';
import { Typography, Paper, useTheme, Grid, Select, MenuItem, FormHelperText, FormControl, InputLabel, FormControlLabel, Checkbox, TextField, } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { normalizeMachineControllerType } from '@openworkshop/lib/api/Machines/MachineControllerType';
import { BaudRate } from '@openworkshop/lib/api/Machines/BaudRate';
import { createStyles, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => createStyles({
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
    }
}));
const CreateMachineProfile = (props) => {
    const log = useLogger(CreateMachineProfile);
    const { t } = useTranslation();
    const theme = useTheme();
    const controllerTypes = Object.keys(MachineControllerType);
    const baudRates = Object.values(BaudRate).filter((br) => typeof br === 'number');
    const classes = useStyles();
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
        React.createElement(Typography, { variant: 'h5' },
            React.createElement(Trans, null, "Connect to your Machine")),
        React.createElement(Paper, { className: classes.paper },
            React.createElement(Grid, { container: true, spacing: 2 },
                React.createElement(Grid, { item: true, xs: 12, sm: 9, md: 6 },
                    React.createElement(Typography, { variant: 'h5', className: classes.headings },
                        React.createElement(Trans, null, "Connection Protocol")),
                    React.createElement(ToggleButtonGroup, { exclusive: true, value: firmware.controllerType, onChange: (e, v) => v && updateFirmware('controllerType', v) }, controllerTypes.map((ct) => {
                        return (React.createElement(ToggleButton, { key: ct, value: normalizeMachineControllerType(ct) }, ct));
                    })),
                    isUntested && (React.createElement("div", { style: { margin: theme.spacing(4) } },
                        React.createElement("em", null,
                            React.createElement(Trans, null,
                                React.createElement("strong", null, "Warning"),
                                ": this protocol is not fully-tested.")))),
                    React.createElement(FormControl, { className: classes.formControl, error: !baudRate },
                        React.createElement(InputLabel, { shrink: true, id: 'baud-rate-label' },
                            React.createElement(Trans, null, "Baud Rate")),
                        React.createElement(Select, { id: 'baud-rate', displayEmpty: true, value: baudRate, onChange: (e) => updateFirmware('baudRate', Number(e.target.value)) },
                            React.createElement(MenuItem, { value: 0 },
                                React.createElement("em", null,
                                    React.createElement(Trans, null, "None"))),
                            baudRates.map((br) => {
                                return (React.createElement(MenuItem, { key: `${br}`, value: br }, br));
                            })),
                        React.createElement(FormHelperText, null,
                            React.createElement(Trans, null, "Required"))),
                    React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: firmware.rtscts, onChange: (e) => updateFirmware('rtscts', !firmware.rtscts) }), label: t('Hardware flow control (rtscts)?') })),
                React.createElement(Grid, { item: true, xs: 12, sm: 6, md: 4 },
                    React.createElement(Typography, { variant: 'h5', className: classes.headings },
                        React.createElement(Trans, null, "Machine Information"),
                        React.createElement(Grid, { container: true },
                            React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                                React.createElement(TextField, { label: t('Brand'), value: profile.brand, onChange: (e) => updateProfile('brand', e.target.value) })),
                            React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                                React.createElement(TextField, { label: t('Model'), value: profile.model, onChange: (e) => updateProfile('model', e.target.value) })),
                            React.createElement(Grid, { item: true, xs: 12 },
                                React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: profile.submit, onChange: (e) => updateProfile('submit', !profile.submit) }), label: t('Submit to community catalog?') })))))))));
};
export default CreateMachineProfile;
//# sourceMappingURL=CreateMachineProfile.js.map