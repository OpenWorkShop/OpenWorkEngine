import React, {FunctionComponent} from 'react';
import {
  MachineLogEntryFragment,
  MachineLogLevel,
  MachineLogSource,
  SerialWriteState,
  SyntaxChunkFragment,
  SyntaxType
} from '../../graphql';
import {Grid, IconButton, Tooltip, useTheme} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {faDotCircle, faExclamationCircle, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {getLogLevelColor, getLogLevelIcon, getLogLevelTitleKey} from '../../Machines';
import {useTrans} from '../../Context';

type Props = {
  logEntry: MachineLogEntryFragment;
};

const LogLine: FunctionComponent<Props> = (props) => {
  const { logEntry } = props;
  const t = useTrans();
  const theme = useTheme();

  const isWriteCmd = logEntry.source === MachineLogSource.SerialWrite;
  const level = t(getLogLevelTitleKey(logEntry.logLevel));
  const title = isWriteCmd ?
    t('Instruction was written') :
    t('{{ level }} message reported by the machine', { level });
  const stateColor = getLogLevelColor(logEntry.logLevel, theme);
  const ts = new Date(logEntry.timestamp);

  const timestamp = ts.toLocaleTimeString().split(' ')[0];
  const tip = t('{{ title }} at {{ timestamp }}',{ title, timestamp });
  const icon = getLogEntryIcon(logEntry);
  const logSysColor = getLogLevelColor(MachineLogLevel.Dbg, theme);
  const gCodeColor = 'white';
  const logCommentColor = theme.palette.success.light;

  function renderTextSpan(text: string, color?: string, key?: string) {
    return <span style={{ color: color ?? 'white' }} key={key} >{text}</span>;
  }

  function renderInstruction(id: number, stateColor: string, code: SyntaxChunkFragment[]) {
    const ret: React.ReactNode[] = [
      // renderTextSpan(inst.source, stateColor, `${id}-translation`),
      renderTextSpan(' [', logSysColor, `${id}-open`),
    ];
    let space = false;
    code.forEach((c, i) => {
      if (space) ret.push(<span key={`${id}-${i}-space`}> </span>);

      const hv = c.value.length > 0;
      const hc = c.comment.length > 0;
      const col = c.type === SyntaxType.Operator ? logSysColor : gCodeColor;

      if (hv) ret.push(renderTextSpan(c.value, col, `${id}-${i}-code`));
      if (hv && hc) ret.push(renderTextSpan(' ', col, `${id}-${i}-space`));
      if (hc) ret.push(renderTextSpan(c.comment, logCommentColor, `${id}-${i}-comment`));

      space = c.type !== SyntaxType.Operator;
    });
    ret.push(renderTextSpan(']', logSysColor, `${id}-close`));
    return ret;
  }

  function getWriteStateIcon(writeState: SerialWriteState): IconDefinition {
    if (writeState === SerialWriteState.Sent) return faDotCircle;
    if (writeState === SerialWriteState.Ok) return faPaperPlane;
    return faExclamationCircle;
  }

  function getLogEntryIcon(logEntry: MachineLogEntryFragment): IconDefinition {
    if (logEntry.source === MachineLogSource.SerialRead) {
      return getLogLevelIcon(logEntry.logLevel);
    } else {
      return getWriteStateIcon(logEntry.writeState);
    }
  }

  //   {renderTextSpan(timestamp, logSysColor)}
  return <Grid key={logEntry.id} item xs={12}>
    <Tooltip title={tip}>
      <IconButton aria-label={tip} size='small' disableFocusRipple>
        <FontAwesomeIcon color={stateColor} icon={icon} />
      </IconButton>
    </Tooltip>
    {renderTextSpan(logEntry.message, stateColor)}
    {logEntry.code && logEntry.code.length > 0 && renderInstruction(logEntry.id, stateColor, logEntry.code)}
    {logEntry.count > 1 && renderTextSpan(` (x${logEntry.count})`, logSysColor)}
  </Grid>;
};

export default LogLine;
