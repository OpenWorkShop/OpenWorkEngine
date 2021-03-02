import {StylesProvider, ThemeProvider} from '@material-ui/core';
import React from 'react';
import {OpenWorkShopProvider} from '../components';
import configureStore from './redux';
import {initReactI18next} from 'react-i18next';
import {i18n} from 'i18next';
import theme from '../themes/Makerverse';
import {IHaveOpenControllerDeployment} from './Context';
import ControllerMain from './ControllerMain';
import {ICustomizedOpenWorkShop, IOpenWorkShop} from '../';
import useLogger from '../utils/logging/UseLogger';
import {BackendConnection} from '../api';
import {BrowserRouter as Router} from 'react-router-dom';
import analytics from './analytics';

const container = document.createElement('div');
document.body.appendChild(container);

const OpenController: React.FunctionComponent<IHaveOpenControllerDeployment> = (props) => {
  const log = useLogger(OpenController);
  const { deployment } = props;

  function builder(ows: IOpenWorkShop): ICustomizedOpenWorkShop {
    ows.log.debug('[STARTUP]', 'connect');
    deployment.connection = new BackendConnection(ows);
    analytics.initialize(deployment.trackingId, deployment.version, ows);
    const i: i18n = ows.i18n;
    return {
      i18n: i.use(initReactI18next),
      connection: deployment.connection,
      store: configureStore(),
    };
  }

  log.debug('Startup');

  return (
    <OpenWorkShopProvider
      theme={theme}
      client={deployment.client}
      hostnameMap={deployment.hostnameMap}
      builder={builder}
    >
      <ThemeProvider theme={theme}>
        <Router >
          <StylesProvider injectFirst>
            <ControllerMain deployment={deployment} />
          </StylesProvider>
        </Router>
      </ThemeProvider>
    </OpenWorkShopProvider>
  );
};

export default OpenController;
