import * as React from 'react';
import OpenWorkShopCore, { IOwsProps } from './OpenWorkShopCore';
import Preloader from './Preloader/Preloader';
import theme from '../themes/Wizard';
import { ThemeProvider } from '@material-ui/core';

// Loader for the core application; Suspense will remain until this is done.
const OpenWorkShopProvider: React.FunctionComponent<IOwsProps> = (props: IOwsProps) => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={props.preloader ?? <Preloader />}>
        <OpenWorkShopCore {...props} />
      </React.Suspense>
    </ThemeProvider>
  );
};

export default OpenWorkShopProvider;
