//
// // Combines multiple mutations into a single result.
// import {MutationDefinitions, MutationHookResponse, tryUseMutations} from '../../utils';
// import {IControllerCommandArgsBase, IControllerCommandResponse} from './types';
//
// export function useControllerCommands<TKey extends string, TData extends IControllerCommandResponse, TVars extends IControllerCommandArgsBase>(
//   mut: MutationDefinitions<TKey, TData, TVars>
// ): MutationHookResponse<TKey, TData, TVars> {
//   return tryUseMutations(mut);
//   // commands.forEach(cmd => {
//   //   cmd.definition;
//   // });
//   // return [mutations, commands];
// }

import {IControllerCommandResponse} from './types';
import { MutationTuple} from '@apollo/client/react/types/types';
import {useSafeMutation} from '../../utils';
import {useDispatch} from 'react-redux';
import controllersSlice from './slice';
import {useWorkspaceSelector} from '../Workspaces';

export function useControllerCommand<TData extends IControllerCommandResponse, TVars>(
  workspaceId: string, mut: MutationTuple<TData, TVars>
): MutationTuple<TData, TVars> {
  const dispatch = useDispatch();
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);

  return useSafeMutation(mut, (data) => {
    console.log('res', data.controller.result.logs);
    dispatch(controllersSlice.actions.onControlledMachineLogs({
      topicId: portName,
      logs: data.controller.result.logs,
    }));
  });
}

export default {};
