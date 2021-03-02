import _ from 'lodash';
import useLogger from '../../utils/logging/UseLogger';
import {OpenWorkShopIcon} from '../../components';
import React, {FunctionComponent} from 'react';
import {createStyles, Divider, List, makeStyles, Theme,} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCogs, faProjectDiagram, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {faUsb} from '@fortawesome/free-brands-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {PortStatusFragment} from '../graphql';
import ListMenuItem from './ListMenuItem';
import {useSystemPorts} from '../Ports';
import {IWorkspace, WorkspaceStatus} from '../Workspaces/';
import {useTrans} from '../Context';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  }),
);

const ListMenu: FunctionComponent = () => {
  const log = useLogger(ListMenu);
  const ports = useSystemPorts();
  const t = useTrans();
  const portList: PortStatusFragment[] = Object.values(ports.portMap);
  const classes = useStyles();
  const allWorkspaces = useSelector<AppState, IWorkspace[]>(s => Object.values(s.workspaces.map));
  const workspaces: IWorkspace[] = _.sortBy(allWorkspaces, ws => ws.settings.name.toLowerCase());
  const showWorkspaces = allWorkspaces.length > 0;
  const iconStyle = { width: 24, height: 24 };

  function renderRouteItem(route: string, text: string, icon: IconProp, t2?: string) {
    return <ListMenuItem
      to={route}
      title={text}
      drawIcon={(color) => <FontAwesomeIcon size='lg' style={iconStyle} icon={icon} color={color} />}
      subcomponent={t2 ? <React.Fragment>{t2}</React.Fragment> : undefined}
    />;
  }

  log.verbose('draw');

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      {showWorkspaces && <React.Fragment>
        <Divider />
        <List component="nav">
          {workspaces.map((workspace) => {
            const route = `/workspaces/${workspace.id}`;
            const port = portList.length > 0 ?
              _.find(portList, p => p.portName === workspace.settings.connection.portName) : undefined;

            return <ListMenuItem
              key={workspace.id}
              to={route}
              title={workspace.settings.name}
              drawIcon={(color) => <OpenWorkShopIcon
                style={{ ...iconStyle, color }}
                name={workspace.settings.icon ?? 'xyz'}
              />}
              subcomponent={<WorkspaceStatus workspaceId={workspace.id} port={port} />}
            />;
          })}
        </List>
        <Divider />
      </React.Fragment>}
      <List >
        {renderRouteItem('/home', t('Projects'), faProjectDiagram, t('MakerHub'))}
        {renderRouteItem('/workspaces', t('Connect'), faUsb, t('Create a Workspace'))}
        {renderRouteItem('/settings', t('Settings'), faCogs, t('& Useful Information'))}
        {renderRouteItem('/docs', t('Documentation'), faQuestionCircle, t('& Support Requests'))}
      </List>
    </React.Fragment>
  );
};

export default ListMenu;
