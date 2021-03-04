import React from 'react';
import ReactDOM from 'react-dom';
import OpenController, {OpenControllerContext} from './core/src/open-controller';
import OpenWorkShopApp from './OpenWorkShop/App/src/App';
import deployment from './deployment';
import * as serviceWorkerRegistration from './OpenWorkShop/App/src/serviceWorkerRegistration';
import reportWebVitals from './OpenWorkShop/App/src/reportWebVitals';
import {OpenWorkShop, Wizard} from '@openworkshop/core';
import {ThemeProvider} from '@material-ui/core';

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<OpenController
  deployment={deployment}
  childRenderer={(ows, oc) => <OpenWorkShop.Provider value={ows}>
    <OpenControllerContext.Provider value={oc}>
      <ThemeProvider theme={Wizard}>
        <OpenWorkShopApp />
      </ThemeProvider>
    </OpenControllerContext.Provider>
  </OpenWorkShop.Provider>}
/>, container);

serviceWorkerRegistration.register();

reportWebVitals();
