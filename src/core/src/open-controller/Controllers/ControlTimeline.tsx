import React, {FunctionComponent} from 'react';
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@material-ui/lab';
import {IHaveWorkspace, useWorkspaceControllerSelector} from '../Workspaces';
import {MachineInstructionResultFragment, MachineLogLevel} from '../graphql';
import {getLogLevelColor, getLogLevelNumber} from '../Machines';
import {useTheme} from '@material-ui/core';
import useStyles from './styles';

type Props = IHaveWorkspace;

const ControlTimeline: FunctionComponent<Props> = (props) => {
  const { workspaceId } = props;
  const theme = useTheme();
  const classes = useStyles();
  const timelineNodes = useWorkspaceControllerSelector( workspaceId, c => c.machine.timeline?.nodes ?? [])
    .filter(n => getLogLevelNumber(n.logLevel) >= getLogLevelNumber(MachineLogLevel.Cfg) );
  const pendingInstructions: MachineInstructionResultFragment[] =
    useWorkspaceControllerSelector(workspaceId, c => c.machine.status.buffer.pendingInstructionResults);
  const numPending = pendingInstructions.length;

  return (<Timeline align="left" className={classes.timeline} >
    {timelineNodes.map(node => {
      const color = getLogLevelColor(node.logLevel, theme);
      const logs = node.logEntries;
      return (
        <TimelineItem key={logs[0].id} className={classes.timelineItem} >
          <TimelineOppositeContent className={classes.timelineLeft} >{node.logLevel}</TimelineOppositeContent>
          <TimelineSeparator className={classes.timelineSep}>
            <TimelineDot
              className={classes.timelineDot}
              variant="filled"
              color="inherit"
              style={{ color, backgroundColor: color }}
            />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineRight} align="left">x{logs.length}</TimelineContent>
        </TimelineItem>
      );
    })}
    <TimelineItem className={classes.timelineItem} >
      <TimelineOppositeContent className={classes.timelineLeft} >QU</TimelineOppositeContent>
      <TimelineSeparator className={classes.timelineSep}>
        <TimelineDot
          className={classes.timelineDot}
          variant="outlined"
          color={numPending > 0 ? 'secondary' : 'primary'}
        />
      </TimelineSeparator>
      <TimelineContent className={classes.timelineRight}>x{numPending}</TimelineContent>
    </TimelineItem>
  </Timeline>);
};

export default ControlTimeline;
