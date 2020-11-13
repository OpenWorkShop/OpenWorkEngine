import React from 'react';
import { MachineSpecPropsFragment } from '@openworkshop/lib/api/graphql';
interface IMachineSpecProps {
    specs: MachineSpecPropsFragment[];
}
declare const MachineSpecList: React.FunctionComponent<IMachineSpecProps>;
export default MachineSpecList;
