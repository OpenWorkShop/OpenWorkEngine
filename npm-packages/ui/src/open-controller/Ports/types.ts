import {PortStatusFragment} from '@openworkshop/lib/api/graphql';

export interface IMaybeHavePortStatus {
  port?: PortStatusFragment;
}

export interface IHavePortStatus {
  port: PortStatusFragment;
}

export type PortMap = { [key: string]: PortStatusFragment };

export interface IPortCollection {
  errors?: (Error | undefined)[];
  portMap: PortMap;
  sortedPortNames: string[];
}
