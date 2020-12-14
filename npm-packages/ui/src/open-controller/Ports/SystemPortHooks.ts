import React from 'react';
import {IPortCollection} from './types';
import { SystemPortContext } from './SystemPortContext';

export function useSystemPorts(): IPortCollection {
  return React.useContext(SystemPortContext);
}
