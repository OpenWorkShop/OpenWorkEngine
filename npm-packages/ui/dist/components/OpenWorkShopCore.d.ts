import * as React from 'react';
import { IOwsOptions } from '@openworkshop/lib/OpenWorkShopSettings';
export interface IOwsProps extends IOwsOptions {
    preloader?: unknown[];
    children: React.ReactNode;
}
declare const OpenWorkShopCore: React.FunctionComponent<IOwsProps>;
export default OpenWorkShopCore;
