import { Dialog, Toolbar, DialogTitle, DialogContent, Tab} from '@material-ui/core';
import * as React from 'react';
import useStyles from './Styles';
import {IHaveWorkspace, IWorkspaceSettingsTab} from './types';
import {useTrans} from '../Context';
import {TabContext, TabList, TabPanel } from '@material-ui/lab';
import useLogger from '../../utils/logging/UseLogger';
import AxesTab from './Settings/AxesTab';
import WorkspaceTab from './Settings/WorkspaceTab';
import PartsTab from './Settings/PartsTab';

type Props = IHaveWorkspace & {
  open: boolean;
  onClose: () => void;
};

const WorkspaceSettingsDialog: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(WorkspaceSettingsDialog);
  const { open, onClose, workspaceId } = props;
  const classes = useStyles();
  const scroll = 'paper';
  const title = t('Settings');
  const [selectedTab, setSelectedTab] = React.useState('workspace');

  const tabs: IWorkspaceSettingsTab[] = [
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
        <TabList onChange={(e, val) => setSelectedTab(val)}>
          {tabs.map((tab) => {
            return <Tab key={tab.key} value={tab.key} label={tab.title} />;
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
