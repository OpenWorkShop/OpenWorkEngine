import _ from 'lodash';
import {IControllerCommandResponse, IControllerCommandResponses} from './types';
import { MutationTuple} from '@apollo/client/react/types/types';
import {useSafeMutation} from '../../utils';
import {useDispatch} from 'react-redux';
import controllersSlice from './slice';
import {useWorkspaceSelector} from '../Workspaces';
import {MachineInstructionResultFragment, MachineLogEntryFragment} from '../graphql';

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
export function useControllerCommand<TData extends IControllerCommandResponse, TVars>(
  workspaceId: string, mut: MutationTuple<TData, TVars>
): MutationTuple<TData, TVars> {
  const dispatch = useDispatch();
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);

  return useSafeMutation(mut, (data) => {
    // console.log('res', data.controller.result.logs);

    dispatch(controllersSlice.actions.onControlledMachineLogs({
      topicId: portName,
      logs: getResponseLogs(data.controller.result.instructionResults),
    }));
  });
}

export function useControllerInstructions<TData extends IControllerCommandResponses, TVars>(
  workspaceId: string, mut: MutationTuple<TData, TVars>
): MutationTuple<TData, TVars> {
  const dispatch = useDispatch();
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);

  return useSafeMutation(mut, (data) => {
    // console.log('res', data.controller.result.logs);

    dispatch(controllersSlice.actions.onControlledMachineLogs({
      topicId: portName,
      logs: _.flatMap(data.controller.results, r => getResponseLogs(r.instructionResults)),
    }));
  });
}

export default {};
