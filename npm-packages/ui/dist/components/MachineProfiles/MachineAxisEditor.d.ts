import { MachineAxisPropsFragment } from '@openworkshop/lib/api/graphql';
import React from 'react';
interface IMachineAxisEditorProps {
    axis: MachineAxisPropsFragment;
    onChanged: (axis: MachineAxisPropsFragment) => void;
}
declare const MachineAxisEditor: React.FunctionComponent<IMachineAxisEditorProps>;
export default MachineAxisEditor;
