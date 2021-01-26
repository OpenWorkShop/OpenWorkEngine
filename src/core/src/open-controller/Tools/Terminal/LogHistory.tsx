import React, { FunctionComponent } from 'react';
import {Grid} from '@material-ui/core';
import LogLine from './LogLine';
import useStyles from './styles';
import {useLogger} from '../../../hooks';
import {MachineLogEntryFragment} from '../../graphql';

type Props = {
  filteredLogs: MachineLogEntryFragment[];
}

const LogHistory: FunctionComponent<Props> = (props) => {
  const log = useLogger(LogHistory);
  const classes = useStyles();
  const { filteredLogs } = props;
  const logsEndRef = React.useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  React.useEffect(() => {
    log.debug('scroll to bottom');
    scrollToBottom();
  }, [filteredLogs]);

  return (
    <Grid container className={classes.history}>
      {filteredLogs.map((l) => <LogLine key={l.id} logEntry={l} />)}
      <div ref={logsEndRef} />
    </Grid>);
};

export default LogHistory;
