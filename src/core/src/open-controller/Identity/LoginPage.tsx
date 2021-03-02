import {Button, Checkbox, CircularProgress, FormControlLabel, Typography,} from '@material-ui/core';
import {useOpenWorkShop} from '../../hooks';
import useLogger from '../../utils/logging/UseLogger';
import {AlertList} from '../../components/Alerts';
import ToolbarCard from '../../components/Cards/ToolbarCard';
import ThreeColumns from '../../components/Layout/ThreeColumns';
import React, {FunctionComponent} from 'react';
import {OpenControllerUser} from '../graphql';
import useStyles from './styles';
import analytics from '../analytics';
import ReactGA from 'react-ga';
import {useDocumentationUrl, useOpenControllerSettings, useTrans} from '../Context';

const LoginPage: FunctionComponent = () => {
  const log = useLogger(LoginPage);
  const ows = useOpenWorkShop();
  const settings = useOpenControllerSettings();
  const urlSecurity = useDocumentationUrl('/features/security');
  const classes = useStyles();
  const t = useTrans();
  const [guest] = React.useState<OpenControllerUser | undefined>(undefined);
  const [useCookies, setUseCookies] = React.useState<boolean>(false);
  const [dangerous, setDangerous] = React.useState<boolean>(false);
  const [authenticating, setAuthenticating] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  //
  // if (auth.isAuthenticated()) {
  //   log.debug('Already logged in; redirecting.');
  //   // return <Redirect to='/home' />;
  // }

  if (error) log.error(error);

  function handleGuest() {
    log.debug('guest login');
  }

  function handleLogin(register: boolean) {
    log.debug('begin authentication');
    analytics.event({
      category: 'interaction',
      action: register ? 'register' : 'login',
    });
    setAuthenticating(true);
    setError(undefined);

    ows.authManager
      .createSigninRequest()
      .then((r) => {
        const url = register ? r.url.replace('/login?', '/register?') : r.url;
        window.location.replace(url);
      })
      .catch((e) => {
        setAuthenticating(false);
        setError(e);
      });
  }

  const footer = <Typography variant="subtitle2">
    {!guest && (
      <ReactGA.OutboundLink eventLabel='why_login' to={urlSecurity} target='_blank'>
        {t('Why is it necessary to log in?')}
      </ReactGA.OutboundLink>
    )}
    {guest && (
      <div>
        <FormControlLabel
          control={<Checkbox checked={useCookies} onChange={() => setUseCookies(!useCookies)} />}
          label={t('Remember me (I consent to cookies)')}
        />
        <FormControlLabel
          control={<Checkbox checked={dangerous} onChange={() => setDangerous(!dangerous)} />}
          label={t('I understand "guest mode" is hazardous.')}
        />
        <br />
        <Button onClick={() => handleGuest()} disabled={authenticating || !dangerous}>
          {t('Continue as Guest')}
        </Button>
      </div>
    )}
  </Typography>;

  return (
    <ThreeColumns>
      <ToolbarCard
        title={t('Login to {{ productName }}', settings)}
        footer={footer}
      >
        <div className={classes.centered}>
          <AlertList error={error} />
          <Button
            className={classes.actionButton}
            variant='outlined'
            color='primary'
            disabled={authenticating}
            onClick={() => handleLogin(false)}
          >
            <img src='/images/logos/makerverse.png' alt='Logo' className={classes.logo1} />
            {!authenticating && (
              <span>
                {t('Login')}
                <br />
                {t('(or Create Account)')}
              </span>
            )}
            {authenticating && <CircularProgress />}
            <img src='/images/logos/openworkshop.png' alt='Logo' className={classes.logo2} />
          </Button>
        </div>
      </ToolbarCard>
      <div className={classes.bottom}>
        <Typography variant='subtitle2'>v. {settings.version.full}</Typography>
      </div>
    </ThreeColumns>
  );
};

export default LoginPage;
