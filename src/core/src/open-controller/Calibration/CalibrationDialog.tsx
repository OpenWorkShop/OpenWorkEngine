import React, {FunctionComponent} from 'react';
import {IHaveWorkspaceId, ITabDefinition} from '../Workspaces';
import {useTrans} from '../Context';
import useLogger from '../../utils/logging/UseLogger';
import useStyles from '../Workspaces/styles';
import WorkspaceTab from '../Workspaces/Settings/WorkspaceTab';
import {Dialog, DialogContent, DialogTitle, Tab, Toolbar} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';

type Props = IHaveWorkspaceId & {
  open: boolean;
  onClose: () => void;
}

const CalibrationDialog: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(CalibrationDialog);
  const { open, onClose, workspaceId } = props;
  const classes = useStyles();
  const title = t('Calibration');
  const [selectedTab, setSelectedTab] = React.useState('workspace');

  const tabs: ITabDefinition[] = [
    {
      key: 'workspace',
      title: t('Workspace'),
      component: <WorkspaceTab workspaceId={workspaceId} />
    },
  ];

  log.verbose('open', open, 'selectedTab', selectedTab);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'}
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

export default CalibrationDialog;
