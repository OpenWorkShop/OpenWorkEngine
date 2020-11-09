import { gql } from '@apollo/client';
export const search = gql `
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
//# sourceMappingURL=MachineProfiles.js.map