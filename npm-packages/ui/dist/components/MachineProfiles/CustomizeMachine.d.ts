import * as React from 'react';
import { ICustomizedMachine } from '@openworkshop/lib/api/Machines/CustomizedMachine';
interface ICustomizeMachineProps {
    onCustomized: (machine: ICustomizedMachine) => void;
}
declare const CustomizeMachine: React.FunctionComponent<ICustomizeMachineProps>;
export default CustomizeMachine;
