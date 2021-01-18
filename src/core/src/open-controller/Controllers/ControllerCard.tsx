import React, {FunctionComponent} from 'react';
import {Card, CardActions, CardContent, CardHeader, Tab, Typography,} from '@material-ui/core';
import {IHaveWorkspace, useWorkspaceControllerSelector} from '../Workspaces';
import clsx from 'clsx';
import useStyles from './styles';
import {ActiveState} from '../graphql';
import {useTrans} from '../Context';
import {getWorkspaceTools} from '../Tools';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {OpenWorkShopIcon} from '../../components';
import ToolGroupPanel from '../Tools/ToolGroupPanel';
import {useLogger} from '../../Hooks';
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
  const error = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.error);
  const tools = getWorkspaceTools(workspaceId);
  const [selectedTab, setSelectedTab] = React.useState(tools[0].id);
  const hasAlarm = activeState == ActiveState.Alarm || alarm;

  function getStateTitle(): string {
    if (alarm) return t('Alarm: {{ alarm }}', { alarm: alarm.name });
    if (activeState === ActiveState.Alarm) return t('Alarm');
    if (error) return t('Error: {{ error }}', { error: error.name });
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

  function getStateSubTitle(): string {
    if (alarm) return alarm.message;
    if (activeState === ActiveState.Alarm) return t('Reset to continue.');
    if (error) return error.message;
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
            [classes.warn]: error || activeState === ActiveState.Check || activeState == ActiveState.Door,
            [classes.ready]: activeState === ActiveState.IdleReady || activeState === ActiveState.Hold,
            [classes.running]: activeState === ActiveState.Initializing || activeState === ActiveState.Run,
            [classes.done]: activeState === ActiveState.Home,
            [classes.disabled]: activeState === ActiveState.Sleep,
          })}
          avatar={<StopButton workspaceId={workspaceId} />}
          title={<HelpfulHeader tip={'yar'} title={getStateTitle()} variant="h6" />}
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
        <CardContent className={classes.controllerCardContent}>
          {tools.map((toolGroup) => {
            return (
              <TabPanel key={toolGroup.id} value={toolGroup.id} className={classes.toolTabPanel} >
                <ToolGroupPanel toolGroup={toolGroup} workspaceId={workspaceId} />
              </TabPanel>
            );
          })}
        </CardContent>
        {/*<CardActions className={classes.controllerCardActions} >*/}
        {/*  Moar Stuff*/}
        {/*</CardActions>*/}
      </Card>
    </TabContext>
  );
};

export default ControllerCard;
