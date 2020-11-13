import { MachinePartCompleteFragment } from '@openworkshop/lib/api/graphql';
import * as React from 'react';
interface IChooseMachinePartsProps {
    partGroup: MachinePartCompleteFragment[];
    onSelected: (partType: string, partId: string | null) => void;
    selectedPartId: string | null;
}
declare const ChooseMachinePart: React.FunctionComponent<IChooseMachinePartsProps>;
export default ChooseMachinePart;
