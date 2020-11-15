import { ICustomizedMachineProfile } from '@openworkshop/lib/api/Machines/CustomizedMachine';
import React from 'react';
import { MachineFirmwareMinimalFragment } from '@openworkshop/lib/api/graphql';
interface ICreateMachineProfileProps {
    onChanged: (firmware: MachineFirmwareMinimalFragment, profile: ICustomizedMachineProfile) => void;
}
declare const CreateMachineProfile: React.FunctionComponent<ICreateMachineProfileProps>;
export default CreateMachineProfile;
