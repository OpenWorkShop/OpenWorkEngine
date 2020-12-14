import React from 'react';
import {IPortCollection} from './types';

export const SystemPortContext: React.Context<IPortCollection> = React.createContext<IPortCollection>({
  errors: [],
  portMap: {},
  sortedPortNames: [],
});
