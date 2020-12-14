import React from 'react';
import {IController} from './types';

const ControllerContext = React.createContext<IController | undefined>(undefined);
export default ControllerContext;
