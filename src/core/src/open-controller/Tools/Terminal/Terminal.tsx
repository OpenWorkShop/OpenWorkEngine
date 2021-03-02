import * as React from 'react';
import _ from 'lodash';
import useStyles from './styles';
import {Button, Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {MachineLogLevel, useCommandMachineMutation} from '../../graphql';
import useLogger, {useComponentName} from '../../../utils/logging/UseLogger';
import {AlertList} from '../../../components';
import {getLogLevelNumber} from '../../Machines';
import {useTrans} from '../../Context';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IMachineLogFilters} from './types';
import LogFiltersDialog from './LogFiltersDialog';
import LogHistory from './LogHistory';
import TerminalInput from './TerminalInput';
import {useControllerCommand} from '../../Controllers/hooks';

const Terminal: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Terminal);
  const source = useComponentName(Terminal);
  const classes = useStyles();
  const { workspaceId } = props;
  const [awaiting, setAwaiting] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [filters, setFilters] =
    React.useState<IMachineLogFilters>({ minimumLogLevel: MachineLogLevel.Cfg });

  const [commandMutation, commandResult] = useControllerCommand(workspaceId, useCommandMachineMutation());
  const minimumLevel = getLogLevelNumber(filters.minimumLogLevel);
  const allLogs = useWorkspaceControllerSelector( workspaceId, c => c.logs.sortedLogs);
  const filteredLogs = _.reject(allLogs, l => getLogLevelNumber(l.logLevel) < minimumLevel);

  async function sendCommand(code: string) {
    const variables = { code, source, workspaceId };
    setAwaiting(true);
    const res = await commandMutation({ variables });
  }

  log.debug('draw', awaiting, commandResult);

  return (
    <div className={classes.root}>
      <Grid container className={classes.altRow}>
        <Grid item xs={11}>
          {t('{{ numFilteredLogs }}/{{ numTotalLogs }} logs; {{ numFilters }} filter(s)', {
            numFilteredLogs: filteredLogs.length,
            numTotalLogs: allLogs.length,
            numFilters: 1,
          })}
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="outlined"
            onClick={() => setFiltersOpen(true)}
            className={classes.modalButton}
            size="small"
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </Button>
        </Grid>
        {commandResult.error && <Grid item xs={12}>
          <AlertList error={commandResult.error} />
        </Grid>}
      </Grid>
      <LogHistory filteredLogs={filteredLogs} />
      <TerminalInput sendCommand={sendCommand} />
      <LogFiltersDialog
        filters={filters}
        setFilters={setFilters}
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />
    </div>
  );
};

export default Terminal;
