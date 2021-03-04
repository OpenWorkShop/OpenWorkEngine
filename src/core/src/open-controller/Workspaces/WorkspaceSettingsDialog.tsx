import {Dialog, DialogContent, DialogTitle, Tab, Toolbar} from '@material-ui/core';
import * as React from 'react';
import useStyles from './styles';
import {IHaveWorkspace, ITabDefinition} from './types';
import {useTrans} from '../Context';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import useLogger from '../../utils/logging/UseLogger';
import AxesTab from './Settings/AxesTab';
import WorkspaceTab from './Settings/WorkspaceTab';
import PartsTab from './Settings/PartsTab';
import {IMaybeHavePortStatus} from '../Ports';
import PortTab from './Settings/PortTab';
import {DetectedFirmwareFragment} from '../graphql';

type Props = IHaveWorkspace & IMaybeHavePortStatus & {
  firmware?: DetectedFirmwareFragment;
  open: boolean;
  onClose: () => void;
};

const WorkspaceSettingsDialog: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(WorkspaceSettingsDialog);
  const { open, onClose, workspaceId, port, firmware } = props;
  const classes = useStyles();
  const scroll = 'paper';
  const title = t('Settings');
  const [selectedTab, setSelectedTab] = React.useState(firmware ? 'workspace' : 'port');

  const tabs: ITabDefinition[] = [
    {
      key: 'workspace',
      title: t('Workspace'),
      component: <WorkspaceTab workspaceId={workspaceId} />
    },
    {
      key: 'axes',
      title: t('Axes'),
      component: <AxesTab workspaceId={workspaceId} />
    },
    {
      key: 'parts',
      title: t('Parts'),
      component: <PartsTab workspaceId={workspaceId} />
    },
    {
      key: 'port',
      title: t('Port'),
      component: <PortTab workspaceId={workspaceId} port={port} firmware={firmware} />
    },
  ];

  log.verbose('open', open, 'selectedTab', selectedTab);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby={title}
      className={classes.dialog}
    >
      <TabContext value={selectedTab}>
        <DialogTitle className={classes.dialogHeader}>
          <Toolbar>
            {title}
          </Toolbar>
        </DialogTitle>
        <TabList onChange={(_, val) => setSelectedTab(val)}>
          {tabs.map((tab) => {
            return <Tab key={tab.key} className={classes.settingsTab} value={tab.key} label={tab.title} />;
          })}
        </TabList>
        <DialogContent className={classes.dialogContent}>
          {tabs.map((tab) => {
            return <TabPanel key={tab.key} value={tab.key} >
              {tab.component}
            </TabPanel>;
          })}
        </DialogContent>
      </TabContext>
    </Dialog>
  );
};

export default  WorkspaceSettingsDialog;
