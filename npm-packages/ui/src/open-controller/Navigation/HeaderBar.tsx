import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
// import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import React, { FunctionComponent } from 'react';
import useStyles from './Styles';
import UserMenu from './UserMenu';
import {IMaybeHaveWorkspace} from '../Workspaces';
import {useOpenControllerSettings} from '../Context';

interface OwnProps {
  toggleDrawerOpen: () => void;
}

type Props = OwnProps & IMaybeHaveWorkspace;

const HeaderBar: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const settings = useOpenControllerSettings();
  const { toggleDrawerOpen, workspace } = props;
  const title = workspace ? workspace.name : settings.productName;

  // const bk = workspace ? { backgroundColor: workspace.hexColor } : {};
  // log.debug('workspace', workspace, bk);

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar} >
        <IconButton
          aria-label='open drawer'
          edge='start'
          onClick={toggleDrawerOpen}
          className={classes.menuButton}
        >
          <img
            src="/images/logos/makerverse.png"
            className={classes.sidebarIcon}
          />
        </IconButton>
        <Typography variant='h1' noWrap className={classes.headerTitle}>
          {title}
        </Typography>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
