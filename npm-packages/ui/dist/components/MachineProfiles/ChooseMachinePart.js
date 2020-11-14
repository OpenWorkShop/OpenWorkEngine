import { getMachinePartTypeTranslationKey } from '@openworkshop/lib/api/Machines/MachinePartType';
import * as React from 'react';
import _ from 'lodash';
import { FormControl, InputLabel, MenuItem, Select, makeStyles, createStyles, FormHelperText, Checkbox, FormControlLabel, } from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
const useStyles = makeStyles((theme) => createStyles({
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const ChooseMachinePart = (props) => {
    var _a, _b;
    const { t } = useTranslation();
    const log = useLogger(ChooseMachinePart);
    const classes = useStyles();
    const firstPart = props.partGroup[0];
    const partType = firstPart.partType;
    const partTypeName = t(getMachinePartTypeTranslationKey(partType));
    const isSingle = props.partGroup.length === 1;
    const isOptional = _.every(props.partGroup, (p) => p.optional);
    const fallbackDefaultPart = isOptional ? undefined : firstPart;
    const defaultPart = (_a = _.find(props.partGroup, (p) => p.isDefault)) !== null && _a !== void 0 ? _a : fallbackDefaultPart;
    const defaultPartId = defaultPart ? defaultPart.id : null;
    const selectedPartId = (_b = props.selectedPartId) !== null && _b !== void 0 ? _b : defaultPartId;
    log.trace('selecting part type', partType, defaultPartId, selectedPartId);
    function onSelected(partId) {
        props.onSelected(partType, partId);
    }
    React.useEffect(() => {
        if (props.selectedPartId !== selectedPartId) {
            onSelected(selectedPartId);
        }
    }, [selectedPartId, props]);
    if (isSingle) {
        return (React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: selectedPartId === firstPart.id, onChange: (e) => onSelected(e.target.checked ? firstPart.id : null) }), label: firstPart.title }));
    }
    return (React.createElement(FormControl, { required: !isOptional, className: classes.formControl },
        React.createElement(InputLabel, { shrink: true, id: `${partType}-label` }, partTypeName),
        React.createElement(Select, { labelId: `${partType}-label`, id: partType, displayEmpty: true, value: selectedPartId !== null && selectedPartId !== void 0 ? selectedPartId : '', onChange: (e) => onSelected(e.target.value), className: classes.selectEmpty },
            isOptional && (React.createElement(MenuItem, { value: '' },
                React.createElement("em", null,
                    React.createElement(Trans, null, "None")))),
            props.partGroup.map((part) => {
                return (React.createElement(MenuItem, { key: part.id, value: part.id }, part.title));
            })),
        !isOptional && (React.createElement(FormHelperText, null,
            React.createElement(Trans, null, "Required")))));
};
export default ChooseMachinePart;
//# sourceMappingURL=ChooseMachinePart.js.map