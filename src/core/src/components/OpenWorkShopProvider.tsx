import * as React from 'react';
import OpenWorkShopCore, {IOwsProps} from './OpenWorkShopCore';
import Preloader from './Layout/Preloader';
import {ThemeProvider} from '@material-ui/core';

// Loader for the core application; Suspense will remain until this is done.
const OpenWorkShopProvider: React.FunctionComponent<IOwsProps> = (props: IOwsProps) => {
  return (
    <ThemeProvider theme={props.theme}>
      <React.Suspense fallback={props.preloader ?? <Preloader />}>
        <OpenWorkShopCore {...props} >
          {props.children}
        </OpenWorkShopCore>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default OpenWorkShopProvider;
