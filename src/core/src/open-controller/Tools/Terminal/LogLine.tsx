import React, {FunctionComponent} from 'react';
import {
  MachineLogEntryFragment,
  MachineLogLevel,
  MachineLogSource,
  SyntaxChunkFragment, SyntaxType
} from '../../graphql';
import {Grid, IconButton, Tooltip, useTheme} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
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

  const timestamp = ts.getMilliseconds().toString();// ts.toLocaleTimeString().split(' ')[0];
  const tip = t('{{ title }} at {{ timestamp }}',{ title, timestamp });
  const icon = getLogEntryIcon(logEntry);
  const logSysColor = getLogLevelColor(MachineLogLevel.Dbg, theme);
  const gCodeColor = 'white';

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

      if (hv) ret.push(renderTextSpan(c.value, gCodeColor, `${id}-${i}-code`));
      if (hv && hc) ret.push(renderTextSpan(' ', gCodeColor, `${id}-${i}-space`));
      if (hc) ret.push(renderTextSpan(c.comment, gCodeColor, `${id}-${i}-comment`));

      space = c.type === SyntaxType.Value || c.type === SyntaxType.Unknown;
    });
    ret.push(renderTextSpan(']', logSysColor, `${id}-close`));
    return ret;
  }

  function getLogEntryIcon(logEntry: MachineLogEntryFragment): IconDefinition {
    if (logEntry.source === MachineLogSource.SerialRead) {
      return getLogLevelIcon(logEntry.logLevel);
    } else {
      return faPaperPlane;
    }
  }

  return <Grid key={logEntry.id} item xs={12}>
    {renderTextSpan(timestamp, logSysColor)}
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
