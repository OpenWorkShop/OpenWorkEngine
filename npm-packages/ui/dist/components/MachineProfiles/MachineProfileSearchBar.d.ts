import { MachineSearchResultFragment } from '@openworkshop/lib/api/graphql';
import * as React from 'react';
interface IMachineProfileSearchProps {
    onSelectedMachineProfile: (mp: MachineSearchResultFragment | undefined) => void;
}
declare const MachineProfileSearchBar: React.FunctionComponent<IMachineProfileSearchProps>;
export default MachineProfileSearchBar;
