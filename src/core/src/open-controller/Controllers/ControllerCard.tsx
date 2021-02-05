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
import {getActiveStateSubTitleKey, getActiveStateTipKey, getActiveStateTitleKey} from './ActiveState';

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
          title={<HelpfulHeader
            tip={t(getActiveStateTipKey(activeState))}
            title={t(getActiveStateTitleKey(activeState))}
            variant="h6"
          />}
          subheader={<Typography variant="subtitle2">{getActiveStateSubTitleKey(activeState, alarm)}</Typography>}
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
