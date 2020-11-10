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
export declare const search: import('@apollo/client').DocumentNode;
