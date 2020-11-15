import { MachinePartCompleteFragment, MachineProfileCompleteFragment } from '@openworkshop/lib/api/graphql';
import React from 'react';
interface IMachineOptionsProps {
    machineProfile: MachineProfileCompleteFragment;
    onComplete: (parts: MachinePartCompleteFragment[]) => void;
}
declare const ChooseMachineParts: React.FunctionComponent<IMachineOptionsProps>;
export default ChooseMachineParts;
