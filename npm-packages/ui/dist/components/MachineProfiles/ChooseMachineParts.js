import { useLogger } from '@openworkshop/lib/utils/logging/UseLogger';
import _ from 'lodash';
import ChooseMachinePart from './ChooseMachinePart';
import MachineSpecList from './MachineSpecList';
import { getMachinePartTypeTranslationKey } from '@openworkshop/lib/api/Machines/MachinePartType';
import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, makeStyles, createStyles, } from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles((theme) => createStyles({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '25%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));
const ChooseMachineParts = (props) => {
    const mp = props.machineProfile;
    const { t } = useTranslation();
    const log = useLogger(ChooseMachineParts);
    const classes = useStyles();
    const groupedParts = _.groupBy(mp.parts, 'partType');
    const allPartTypes = Object.keys(groupedParts);
    const includedParts = {};
    const selectableParts = {};
    const defaultSelectedParts = {};
    allPartTypes.forEach((partType) => {
        const parts = groupedParts[partType];
        if (parts.length === 1 && !parts[0].optional) {
            includedParts[partType.toString()] = parts[0];
            defaultSelectedParts[partType.toString()] = parts[0].id;
        }
        else {
            selectableParts[partType.toString()] = parts;
        }
    });
    const [selectedPartIds, setSelectedPartIds] = React.useState(defaultSelectedParts);
    function onSelectedPart(partType, partId) {
        if (partId) {
            selectedPartIds[partType] = partId;
        }
        else {
            delete selectedPartIds[partType];
        }
        setSelectedPartIds(Object.assign({}, selectedPartIds));
        log.debug('part selection', partType, partId, selectedPartIds);
        const isCompletePartList = _.every(allPartTypes, (pt) => _.has(selectedPartIds, pt) || _.every(groupedParts[pt], (p) => p.optional));
        if (isCompletePartList) {
            const parts = Object.keys(selectedPartIds).map((pt) => _.find(mp.parts, (p) => p.id === selectedPartIds[pt]));
            props.onComplete(parts);
        }
    }
    function renderPartSummary(partType, part) {
        const partTypeName = t(getMachinePartTypeTranslationKey(partType));
        const specs = part ? part.specs : [];
        return (React.createElement(AccordionSummary, { expandIcon: React.createElement(FontAwesomeIcon, { icon: faCaretSquareDown }) },
            React.createElement(Typography, { className: classes.heading },
                React.createElement("strong", null, partTypeName),
                part && React.createElement("span", null,
                    ": ",
                    part.title)),
            React.createElement(Typography, { className: classes.secondaryHeading },
                specs.length > 0 && React.createElement(MachineSpecList, { specs: specs }),
                !part && React.createElement(Trans, null, "(None selected)"))));
    }
    function renderIncludedParts() {
        return Object.keys(includedParts).map((partType) => {
            const part = includedParts[partType];
            const hasDescription = part.description && part.description.length > 0;
            return (React.createElement(Accordion, { key: partType },
                renderPartSummary(partType, part),
                React.createElement(AccordionDetails, null,
                    hasDescription && (React.createElement(Typography, { display: 'block' },
                        React.createElement("span", null, part.description))),
                    React.createElement(Typography, { color: 'secondary', variant: 'caption' },
                        React.createElement("em", null,
                            React.createElement(Trans, null, "This part is always included with your machine."))))));
        });
    }
    function renderSelectableParts() {
        return Object.keys(selectableParts).map((partType) => {
            const selectedPartId = _.has(selectedPartIds, partType) ? selectedPartIds[partType] : null;
            const part = selectedPartId && _.find(mp.parts, (p) => p.id === selectedPartId);
            return (React.createElement(Accordion, { key: partType },
                renderPartSummary(partType, part ? part : undefined),
                React.createElement(AccordionDetails, null,
                    React.createElement(ChooseMachinePart, { onSelected: onSelectedPart, partGroup: selectableParts[partType], selectedPartId: selectedPartId }))));
        });
    }
    return (React.createElement("div", null,
        renderSelectableParts(),
        renderIncludedParts()));
};
export default ChooseMachineParts;
//# sourceMappingURL=ChooseMachineParts.js.map