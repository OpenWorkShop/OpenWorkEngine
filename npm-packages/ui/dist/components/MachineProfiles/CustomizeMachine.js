import { AxisName, useGetCompleteMachineProfileLazyQuery, } from '@openworkshop/lib/api/graphql';
import _ from 'lodash';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import * as React from 'react';
import ChooseMachineParts from './ChooseMachineParts';
import CreateMachineProfile from './CreateMachineProfile';
import MachineAxesEditor from './MachineAxesEditor';
import MachineProfileSearchBar from './MachineProfileSearchBar';
import { Grid, CircularProgress, Typography, Button, useTheme } from '@material-ui/core';
import { Trans } from 'react-i18next';
const CustomizeMachine = (props) => {
    const log = useLogger(CustomizeMachine);
    const theme = useTheme();
    const [machineProfile, setMachineProfile] = React.useState(undefined);
    const [getCompleteMachineProfile, { loading, error, data }] = useGetCompleteMachineProfileLazyQuery();
    const mp = data ? data.machineProfile : undefined;
    const loadedMachineProfile = !loading && machineProfile && mp && machineProfile.id === mp.id ? mp : undefined;
    const [customizedMachine, setCustomizedMachine] = React.useState(undefined);
    const [searchMachines, setSearchMachines] = React.useState(true);
    React.useEffect(() => {
        var _a;
        if (loadedMachineProfile &&
            (!customizedMachine || customizedMachine.profile.machineProfileId !== loadedMachineProfile.id)) {
            setCustomizedMachine({
                profile: {
                    machineProfileId: loadedMachineProfile.id,
                    brand: (_a = loadedMachineProfile.brand) !== null && _a !== void 0 ? _a : undefined,
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
    if (error)
        log.error('load profile error', error.networkError);
    function onCustomized(machine) {
        log.debug('customized machine', machine);
        setCustomizedMachine(machine);
        props.onCustomized(machine);
    }
    function onSelectedMachineProfile(mp) {
        log.debug('machine profile selection', mp);
        setMachineProfile(mp);
        onCustomized(undefined);
        if (mp && (!loadedMachineProfile || loadedMachineProfile.id !== mp.id)) {
            getCompleteMachineProfile({ variables: { id: mp.id } });
        }
    }
    function onCreatingMachineProfile(firmware, profile) {
        const defaultAxis = {
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
            axes: { X: Object.assign({}, defaultAxis), Y: Object.assign(Object.assign({}, defaultAxis), { name: AxisName.Y }), Z: Object.assign(Object.assign({}, defaultAxis), { name: AxisName.Z }) },
            features: [],
        });
    }
    function onCompletedParts(parts) {
        log.debug('set parts', parts);
        // const cm: ICustomizedMachine = _.deepClone(customizedMachine);
        if (!customizedMachine) {
            log.error('missing machine');
            return;
        }
        onCustomized(Object.assign(Object.assign({}, customizedMachine), { parts: _.cloneDeep(parts) }));
    }
    function onChangedAxes(axes) {
        log.debug('set axes', axes);
        if (!customizedMachine) {
            log.error('missing machine');
            return;
        }
        onCustomized(Object.assign(Object.assign({}, customizedMachine), { axes: _.cloneDeep(axes) }));
    }
    function startOver() {
        setMachineProfile(undefined);
        onCustomized(undefined);
    }
    return (React.createElement(Grid, { container: true, spacing: 2, style: { marginBottom: theme.spacing(2) } },
        React.createElement(Grid, { item: true, xs: 12 },
            searchMachines && React.createElement(MachineProfileSearchBar, { onSelectedMachineProfile: onSelectedMachineProfile }),
            React.createElement("div", { style: { marginTop: theme.spacing(1) } },
                React.createElement(Button, { variant: 'outlined', onClick: () => (customizedMachine ? startOver() : setSearchMachines(!searchMachines)), style: { marginLeft: theme.spacing(2), float: 'right' } },
                    customizedMachine && React.createElement(Trans, null, "Start Over"),
                    !customizedMachine && searchMachines && React.createElement(Trans, null, "Can't find your machine?"),
                    !customizedMachine && !searchMachines && React.createElement(Trans, null, "Search the Community Catalog")),
                !customizedMachine && searchMachines && props.tip && (React.createElement("div", null,
                    React.createElement(Typography, { variant: 'subtitle2' }, props.tip)))),
            !searchMachines && React.createElement(CreateMachineProfile, { onChanged: onCreatingMachineProfile })),
        loading && (React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(CircularProgress, { size: 32 }),
            React.createElement(Trans, null, "Loading machine options..."))),
        loadedMachineProfile && (React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(Typography, { variant: 'h5' },
                React.createElement(Trans, null, "Customize your Machine")),
            React.createElement(Typography, { variant: 'subtitle2' },
                React.createElement(Trans, null, "Default parts are pre-selected below... but please change them if you have upgraded, modified, or used a non-standard kit.")))),
        loadedMachineProfile && customizedMachine && (React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(ChooseMachineParts, { machineProfile: loadedMachineProfile, onComplete: onCompletedParts }))),
        customizedMachine && (React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(MachineAxesEditor, { axes: customizedMachine.axes, onChanged: onChangedAxes })))));
};
export default CustomizeMachine;
//# sourceMappingURL=CustomizeMachine.js.map