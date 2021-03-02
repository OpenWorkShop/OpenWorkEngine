import _ from 'lodash';
import {IControllerCommandResponse, IControllerCommandResponses} from './types';
import {MutationTuple} from '@apollo/client/react/types/types';
import {useSafeMutation} from '../../utils';
import {useDispatch} from 'react-redux';
import controllersSlice from './slice';
import {useWorkspaceSelector} from '../Workspaces';
import {MachineInstructionResultFragment, MachineLogEntryFragment} from '../graphql';
import React from 'react';
import {useLoggerName} from '../../utils/logging/UseLogger';

function getResponseLogs(instructionResults: MachineInstructionResultFragment[]): MachineLogEntryFragment[] {
  const logs = instructionResults.map(r => r.writeLogEntry);
  instructionResults.forEach(r => {
    if (r.responseLogEntry) {
      logs.push(r.responseLogEntry);
    }
  });
  return logs;
}

// Automatically add logs observed in the response.
function useControllerCmd<TData, TVars>(
  workspaceId: string, mut: MutationTuple<TData, TVars>, extract: (data: TData) => MachineLogEntryFragment[]
): MutationTuple<TData, TVars> {
  const dispatch = useDispatch();
  const log = useLoggerName('Controller');
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);
  const [responseLogs, setResponseLogs] = React.useState<MachineLogEntryFragment[]>([]);

  React.useEffect(() => {
    if (responseLogs.length > 0) {
      log.debug('[CMD]', '[LOGS]', responseLogs);
      dispatch(controllersSlice.actions.onControlledMachineLogs({
        topicId: portName,
        logs: responseLogs,
      }));
    }
  }, [dispatch, portName, responseLogs]);

  return useSafeMutation(mut, (data) => {
    setResponseLogs(extract(data));
  });
}

// Automatically add logs observed in the response.
export function useControllerCommand<TData extends IControllerCommandResponse, TVars>(
  workspaceId: string, mut: MutationTuple<TData, TVars>
): MutationTuple<TData, TVars> {
  return useControllerCmd(workspaceId, mut, data => getResponseLogs(data.controller.result.instructionResults));
}

export function useControllerInstructions<TData extends IControllerCommandResponses, TVars>(
  workspaceId: string, mut: MutationTuple<TData, TVars>
): MutationTuple<TData, TVars> {
  return useControllerCmd(workspaceId, mut, data => _.flatMap(data.controller.results, r => getResponseLogs(r.instructionResults)));
}

export default {};
