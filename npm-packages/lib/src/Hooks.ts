import React from 'react';
import OpenWorkShop from './OpenWorkShop';
import { IOpenWorkShop, TTranslateFunc } from './types';

export function useOpenWorkShop(): IOpenWorkShop {
  return React.useContext(OpenWorkShop);
}

export function useOwsTrans(): TTranslateFunc {
  const ows = useOpenWorkShop();
  return ows.t.bind(ows);
}
