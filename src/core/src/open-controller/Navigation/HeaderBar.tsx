import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import React, {FunctionComponent} from 'react';
import useStyles from './styles';
import UserMenu from './UserMenu';
import {IMaybeHaveWorkspace, tryUseWorkspace} from '../Workspaces';
import {useOpenControllerSettings} from '../Context';

interface OwnProps {
  toggleDrawerOpen: () => void;
}

type Props = OwnProps & IMaybeHaveWorkspace;

const HeaderBar: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const settings = useOpenControllerSettings();
  const { toggleDrawerOpen, workspaceId } = props;
  const workspace = tryUseWorkspace(workspaceId);
  const title = workspace ? workspace.settings.name : settings.productName;

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
