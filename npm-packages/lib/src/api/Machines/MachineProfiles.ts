import { gql } from '@apollo/client';

export interface IMachineProfileProps {
  name: string;
  brand: string;
  model: string;
  icon: string;
  description: string;
  machineCategory: string;
  discontinued: boolean;
}

export interface IMachineProfile extends IMachineProfileProps {
  id: string;
}

export interface IMachineProfileSearchData {
  machineProfiles: IMachineProfile[];
}

export const search = gql`
    query machines {
        machineProfiles: machineProfiles {
            id
            name
            brand
            model
            icon
            description
            machineCategory
            discontinued
        }
    }
`;
