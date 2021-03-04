import React, {FunctionComponent} from 'react';
import {Card, CardActions, CardHeader, IconButton, Tab, Tooltip, Typography,} from '@material-ui/core';
import {IHaveWorkspace, tryUseWorkspaceControllerSelector, useWorkspaceControllerSelector} from '../Workspaces';
import clsx from 'clsx';
import useStyles from './styles';
import {ActiveState, MachineBufferFragment} from '../graphql';
import {useTrans} from '../Context';
import {getWorkspaceTools} from '../Tools';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {OpenWorkShopIcon} from '../../components';
import ToolGroupPanel from '../Tools/ToolGroupPanel';
import {useLogger} from '../../hooks';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import StopButton from './StopButton';
import {getActiveStateSubTitleKey, getActiveStateTipKey, getActiveStateTitleKey} from './ActiveState';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

type Props = IHaveWorkspace;

const ControllerCard: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const t = useTrans();
  const log = useLogger(ControllerCard);
  const { workspaceId } = props;
  const activeState = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.activityState);
  const alarm = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.alarm);
  const buffer = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.status.buffer);
  // const features = useWorkspaceSelector(workspaceId, ws => ws.settings.features);
  const tools = getWorkspaceTools(workspaceId);
  const [selectedTab, setSelectedTab] = React.useState(tools[0].id);
  const hasAlarm = activeState == ActiveState.Alarm || alarm;

  function getStateLabel(s?: ActiveState, b?: MachineBufferFragment): string {
    const ret: string[] = [];
    log.debug('state', s, b);
    if (s === ActiveState.Run && b?.lastInstructionResult) ret.push(b.lastInstructionResult.writeLogEntry.message);
    else if (s) ret.push(t(getActiveStateTitleKey(s)));
    if (b) {
      const num = b.writeQueueLength + b.responseQueueLength;
      if (num > 0) ret.push(`+${num}`);
    }
    return ret.join(' ');
  }

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
            title={t(getStateLabel(activeState, buffer))}
            variant="h6"
          />}
          subheader={<Typography variant="subtitle2">{getActiveStateSubTitleKey(activeState, alarm)}</Typography>}
          action={<Tooltip title={t('Reset Chains')} >
            <IconButton color="secondary">
              <FontAwesomeIcon icon={faEllipsisV} />
            </IconButton>
          </Tooltip>}
        />
        <CardActions className={classes.controllerCardActions} >
          <TabList onChange={(_, val) => setSelectedTab(val)}>
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
      </Card>
    </TabContext>
  );
};

export default ControllerCard;
