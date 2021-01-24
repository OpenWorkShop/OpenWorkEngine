import React, {FunctionComponent} from 'react';
import {Card, CardActions, CardHeader, Tab, Typography,} from '@material-ui/core';
import {IHaveWorkspace, useWorkspaceControllerSelector} from '../Workspaces';
import clsx from 'clsx';
import useStyles from './styles';
import {ActiveState} from '../graphql';
import {useTrans} from '../Context';
import {getWorkspaceTools} from '../Tools';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {OpenWorkShopIcon} from '../../components';
import ToolGroupPanel from '../Tools/ToolGroupPanel';
import {useLogger} from '../../hooks';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import StopButton from './StopButton';

type Props = IHaveWorkspace;

const ControllerCard: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const t = useTrans();
  const log = useLogger(ControllerCard);
  const { workspaceId } = props;
  const activeState = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.activityState);
  const alarm = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.alarm);
  const tools = getWorkspaceTools(workspaceId);
  const [selectedTab, setSelectedTab] = React.useState(tools[0].id);
  const hasAlarm = activeState == ActiveState.Alarm || alarm;

  function getStateTitle(): string {
    if (alarm) return t('Alarm: {{ alarm }}', { alarm: alarm.name });
    if (activeState === ActiveState.Alarm) return t('Alarm');
    if (activeState === ActiveState.IdleReady) return t('Ready');
    if (activeState === ActiveState.Run) return t('Active');
    if (activeState === ActiveState.Initializing) return t('Initializing...');
    if (activeState === ActiveState.Check) return t('Check');
    if (activeState === ActiveState.Hold) return t('Hold');
    if (activeState === ActiveState.Sleep) return t('Sleep');
    if (activeState === ActiveState.Door) return t('Door');
    if (activeState === ActiveState.Home) return t('Home');
    return t('Unknown');
  }

  function getStateTip(): string {
    if (alarm || activeState === ActiveState.Alarm) return t('The machine has stopped and is awaiting un-lock.');
    if (activeState === ActiveState.IdleReady) return t('The machine is idle and ready for instructions.');
    if (activeState === ActiveState.Run) return t('Operation in progress.');
    if (activeState === ActiveState.Initializing) return t('Initializing...');
    if (activeState === ActiveState.Sleep) return t('Sleeping... ');
    if (activeState === ActiveState.Check) return t('Machine requires user attention.');
    if (activeState === ActiveState.Hold) return t('Hold');
    if (activeState === ActiveState.Door) return t('Door');
    if (activeState === ActiveState.Home) return t('Home');
    return t('Unknown');
  }

  function getStateSubTitle(): string {
    if (alarm) return alarm.message;
    if (activeState === ActiveState.Alarm) return t('Reset to continue.');
    if (activeState === ActiveState.IdleReady) return t('Machine is idle.');
    if (activeState === ActiveState.Run) return t('Executing command(s).');
    if (activeState === ActiveState.Initializing) return t('Awaiting machine...');
    // if (activeState === ActiveState.Check) return t('Check');
    // if (activeState === ActiveState.Hold) return t('Hold');
    // if (activeState === ActiveState.Sleep) return t('Sleep');
    // if (activeState === ActiveState.Door) return t('Door');
    // if (activeState === ActiveState.Home) return t('Home');
    return '';
  }

  log.verbose('draw');

  return (
    <TabContext value={selectedTab}>
      <Card className={classes.controllerCard} >
        <CardHeader
          className={clsx(classes.controllerCardHeader, {
            [classes.alarm]: hasAlarm,
            [classes.warn]: activeState === ActiveState.Check || activeState == ActiveState.Door,
            [classes.ready]: activeState === ActiveState.IdleReady,
            [classes.running]: activeState === ActiveState.Initializing || activeState === ActiveState.Run,
            [classes.paused]: activeState === ActiveState.Hold,
            [classes.done]: activeState === ActiveState.Home,
            [classes.disabled]: activeState === ActiveState.Sleep,
          })}
          avatar={<StopButton workspaceId={workspaceId} />}
          title={<HelpfulHeader tip={getStateTip()} title={getStateTitle()} variant="h6" />}
          subheader={<Typography variant="subtitle2">{getStateSubTitle()}</Typography>}
        />
        <CardActions className={classes.controllerCardActions} >
          <TabList onChange={(e, val) => setSelectedTab(val)}>
            {tools.map((toolGroup) => {
              return <Tab
                key={toolGroup.id}
                value={toolGroup.id}
                label={<OpenWorkShopIcon name={toolGroup.icon} />}
                className={classes.toolTab}
              />;
            })}
          </TabList>
        </CardActions>
        <div className={classes.controllerCardContent}>
          {tools.map((toolGroup) => {
            return (
              <TabPanel key={toolGroup.id} value={toolGroup.id} className={classes.toolTabPanel} >
                <ToolGroupPanel toolGroup={toolGroup} workspaceId={workspaceId} />
              </TabPanel>
            );
          })}
        </div>
        {/*<CardActions className={classes.controllerCardActions} >*/}
        {/*  Moar Stuff*/}
        {/*</CardActions>*/}
      </Card>
    </TabContext>
  );
};

export default ControllerCard;
