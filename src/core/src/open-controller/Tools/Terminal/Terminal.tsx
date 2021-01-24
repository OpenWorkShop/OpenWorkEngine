import * as React from 'react';
import useStyles from './styles';
import {Grid, useTheme} from '@material-ui/core';
import {ToolBase} from '../types';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {
  CompiledInstructionFragment,
  MachineLogEntryFragment,
  MachineLogLevel,
  useCommandMachineMutation
} from '../../graphql';
import {useHotkeys} from 'react-hotkeys-hook';
import useLogger, {useComponentName} from '../../../utils/logging/UseLogger';
import {useTrans} from '../../Context';
import {HoverHelpStep} from '../../../components';
import {tryUseMutation} from '../../../utils';

const Terminal: ToolBase = (props) => {
  const log = useLogger(Terminal);
  const source = useComponentName(Terminal);
  const t = useTrans();
  const theme = useTheme();
  const classes = useStyles();
  const { workspaceId } = props;
  const [inputCommand, setInputCommand] = React.useState('');
  const command = tryUseMutation(useCommandMachineMutation());
  const logs = useWorkspaceControllerSelector(workspaceId, c => c.machine.logs?.nodes ?? []);
  const writeColor = 'white';

  async function sendCommand() {
    const variables = { code: inputCommand, source, workspaceId };
    const data = await command.invoke(variables);
    log.debug('[CMD]', data);
  }

  function applyKeycode(e: KeyboardEvent, val: string): string {
    if (e.ctrlKey || e.altKey || e.metaKey) return val;
    let str = `${val}`;
    if (e.key === 'Backspace') {
      if (str.length >= 1) str = str.slice(0, str.length - 1);
    } else if (e.key.length === 1) {
      str = str + e.key;
    } else {
      log.warn('Unknown key', e.key);
      return str;
    }
    return str;
  }

  useHotkeys('*', (e ) => {
    if (e.key === 'Enter') {
      if (inputCommand.length > 0) {
        void sendCommand();
      }
      return;
    }
    setInputCommand(applyKeycode(e, inputCommand));
  }, [inputCommand]);

  function getLogLevelTitle(ll: MachineLogLevel): string {
    if (ll === MachineLogLevel.Dbg) return t('Debug');
    if (ll === MachineLogLevel.Inf) return t('Information');
    if (ll === MachineLogLevel.Wrn) return t('Warning');
    if (ll === MachineLogLevel.Err) return t('Error');
    return '?';
  }

  function getLogLevelColor(ll: MachineLogLevel): string {
    if (ll === MachineLogLevel.Dbg) return theme.palette.grey.A200;
    if (ll === MachineLogLevel.Inf) return theme.palette.info.light;
    if (ll === MachineLogLevel.Wrn) return theme.palette.warning.light;
    if (ll === MachineLogLevel.Err) return theme.palette.error.light;
    return theme.palette.grey.A700;
  }

  function renderTextSpan(text: string, color?: string) {
    return <span style={{ color: color ?? 'white' }}>{text}</span>;
  }

  function renderInstruction(id: string, inst: CompiledInstructionFragment) {
    return inst.chunks.map(c => {
      const hv = c.value.length > 0;
      const hc = c.comment.length > 0;
      return <span key={id} >
        {hv && renderTextSpan(c.value, writeColor)}
        {(hv && hc) && ' '}
        {hc && renderTextSpan(c.comment, theme.palette.grey.A200)}
      </span>;
    });
  }

  function renderLogLine(logEntry: MachineLogEntryFragment) {
    const ll = logEntry.logLevel;
    const isWriteCmd = Boolean(logEntry.instruction);
    const title = getLogLevelTitle(ll);
    const stateColor = isWriteCmd ? theme.palette.success.light : getLogLevelColor(ll);
    const pre = isWriteCmd ? '<' : '>';
    const tip = t('{{ title }} happened at {{ timestamp }}',{ title, timestamp: logEntry.timestamp });
    return [
      <Grid key={logEntry.id} item xs={12}>
        <HoverHelpStep tip={tip} />
        {renderTextSpan(`[${logEntry.logLevel.toString()}]${pre}`, stateColor)}
        {!isWriteCmd && renderTextSpan(logEntry.message)}
        {logEntry.instruction && renderInstruction(logEntry.id, logEntry.instruction)}
        {/*{log.count > 1 && renderTextSpan(` (x${log.count})`, col)}*/}
      </Grid>,
    ];
  }

  return (
    <div className={classes.root}>
      <Grid container >
        {logs.map(renderLogLine)}
        <Grid item xs={12}>
          {renderTextSpan('$> ', theme.palette.grey.A700)}
          {renderTextSpan(inputCommand, 'white')}
        </Grid>
      </Grid>
    </div>
  );
};

export default Terminal;
