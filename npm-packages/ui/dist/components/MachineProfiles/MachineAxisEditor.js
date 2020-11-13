import React from 'react';
import { Grid, Typography, InputAdornment, useTheme, Tooltip, IconButton } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import AlertList from '../Alerts/AlertList';
import NumericInput from '../Forms/NumericInput';
import { Alert } from '@material-ui/lab';
const MachineAxisEditor = (props) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const axis = props.axis;
    const axisName = axis.name.toLowerCase();
    const isX = axisName === 'x';
    const isY = axisName === 'y';
    const isXY = isX || isY;
    const isZ = axisName === 'z';
    const isXYZ = isXY || isZ;
    const warnings = [];
    if (axis.precision < 1 || axis.precision >= 20)
        warnings.push(t('Precision value is unusual.'));
    if (axis.accuracy < 0.0000001 || axis.accuracy >= 1)
        warnings.push(t('Accuracy value is unusual.'));
    function getTooltip(key) {
        if (!isXYZ)
            return undefined;
        if (key === 'min') {
            if (isZ)
                return t('For CNC machines, the max plunge distance (negative). For 3D printers, this should remain zero.');
            if (isXY)
                return t('If the origin is in the bottom-left, this should remain zero. If the origin is in the middle, it should the same value as max -- except negative.');
        }
        if (key === 'max') {
            let dir = t('vertical');
            if (isX)
                dir = t('rightward');
            if (isY)
                dir = t('upward-horizontal');
            return t('The maximum distance to move (in the {{ dir }} direction).', { dir });
        }
        if (key === 'precision') {
            return t('The number of digits to round the axis value to in the UI.');
        }
        if (key === 'accuracy') {
            return t('The smallest distance at which this axis can accurately move.');
        }
        return undefined;
    }
    function renderCell(key) {
        const name = t(key.charAt(0).toUpperCase() + key.substring(1));
        const units = key === 'precision' ? t('digits') : 'mm';
        const tip = getTooltip(key);
        return (React.createElement(Grid, { item: true, xs: 6 },
            React.createElement(NumericInput, { id: "min", label: name, variant: "outlined", integersOnly: key === 'precision', numericValue: axis[key], onChangeNumericValue: (v) => props.onChanged(Object.assign(Object.assign({}, axis), { [key]: v })), InputProps: {
                    startAdornment: tip && (React.createElement(InputAdornment, { position: "start" },
                        React.createElement(Tooltip, { title: tip },
                            React.createElement(IconButton, { "aria-label": name, size: "small", disableFocusRipple: true },
                                React.createElement(FontAwesomeIcon, { color: theme.palette.info.light, icon: faQuestionCircle }))))),
                    endAdornment: React.createElement(InputAdornment, { position: "end" }, units),
                } })));
    }
    return (React.createElement(Grid, { container: true, spacing: 2 },
        React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(Typography, { variant: "h5" },
                props.axis.name,
                React.createElement(Trans, null, "-Axis"))),
        renderCell('min'),
        renderCell('max'),
        renderCell('accuracy'),
        renderCell('precision'),
        warnings.length > 0 && React.createElement(AlertList, null, warnings.map(w => {
            return React.createElement(Alert, { key: "w", severity: "warning" }, w);
        }))));
};
export default MachineAxisEditor;
//# sourceMappingURL=MachineAxisEditor.js.map