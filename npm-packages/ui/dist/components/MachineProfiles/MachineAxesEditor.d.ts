import React from 'react';
import { MachineAxes } from '@openworkshop/lib/api/Machines/CustomizedMachine';
interface IMachineAxesEditorProps {
    axes: MachineAxes;
    onChanged: (axes: MachineAxes) => void;
}
declare const MachineAxesEditor: React.FunctionComponent<IMachineAxesEditorProps>;
export default MachineAxesEditor;
