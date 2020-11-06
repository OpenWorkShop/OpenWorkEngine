import React from 'react';
import owsCore, { OpenWorkShopCore } from './OpenWorkShopCore';

const OpenWorkShopContext: React.Context<OpenWorkShopCore> = React.createContext<OpenWorkShopCore>(owsCore);

export default OpenWorkShopContext;
