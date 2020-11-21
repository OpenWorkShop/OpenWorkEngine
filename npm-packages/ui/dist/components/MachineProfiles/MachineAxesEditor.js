import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import MachineAxisEditor from './MachineAxisEditor';
function GetGridCellSize(val) {
    if (val >= 12)
        return 12;
    if (val === 11)
        return 11;
    if (val === 10)
        return 10;
    if (val === 9)
        return 9;
    if (val === 8)
        return 8;
    if (val === 7)
        return 7;
    if (val === 6)
        return 6;
    if (val === 5)
        return 5;
    if (val === 4)
        return 4;
    if (val === 3)
        return 3;
    if (val === 2)
        return 2;
    return 1;
}
const MachineAxesEditor = (props) => {
    const axisNames = Object.keys(props.axes);
    const size = GetGridCellSize(Math.floor(12 / axisNames.length));
    const axes = props.axes;
    function onChangedAxis(axis) {
        axes[axis.name] = Object.assign({}, axis);
        props.onChanged(axes);
    }
    return (React.createElement(Grid, { container: true, spacing: 4, style: { flexGrow: 1 } }, axisNames.map((axisName) => {
        const axis = axes[axisName];
        return (React.createElement(Grid, { key: axis.name, item: true, xs: 12, sm: 6, md: size },
            React.createElement(Paper, { style: { padding: 20, minWidth: 300 } },
                React.createElement(MachineAxisEditor, { axis: axis, onChanged: onChangedAxis }))));
    })));
};
export default MachineAxesEditor;
//# sourceMappingURL=MachineAxesEditor.js.map