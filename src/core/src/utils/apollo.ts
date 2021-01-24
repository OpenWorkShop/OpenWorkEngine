import {MutationHookOptions, MutationTuple} from '@apollo/client/react/types/types';
import {useLoggerName} from './logging/UseLogger';
import {IAlertMessage} from '../components';
import React from 'react';
import {Logger} from './logging';
import {MutationOptions} from '@apollo/client';
import workspacesSlice from '../open-controller/Workspaces/slice';

export interface IMutationResult<TData> {
  error?: IAlertMessage;
  data?: TData;
}

export interface IMutationState<TData> extends IMutationResult<TData> {
  loading: boolean;
}

export type AsyncMutation<TData, TVars> = {
  definition: MutationTuple<TData, TVars>;
  invoke: (vars?: TVars) => Promise<IMutationResult<TData>>;
}

// Wrap a MutationTuple (definition) into a try/catch block and return an async function to invoke it.
function tryMutation<TData, TVars>(log: Logger, mutation: MutationTuple<TData, TVars>): AsyncMutation<TData, TVars> {
  const name = mutation[0].name;
  const invoke = async (variables?: TVars) => {
    let error: IAlertMessage | undefined = undefined;
    try {
      log.debug('[MUTATION]', 'invoke', mutation[0], mutation[1], variables);
      const opts = variables ? { variables } : {};
      const result = (await mutation[0](opts)) ?? undefined;
      if (result.data) {
        return { data: result.data };
      }
    } catch (e) {
      log.error(e, name, variables);
      error = e;
    }
    if (!error) {
      log.error('[EMPTY]', name, variables);
      error = new Error('Empty response from server');
    }
    return { error };
  };
  return { definition: mutation, invoke };
}

export type MutationMap<TData, TVars> = { [key: string]: AsyncMutation<TData, TVars> };

export type MutationCollection<TData, TVars> = IMutationResult<TData> & {
  loading: boolean;
  mutations: MutationMap<TData, TVars>;
}

// Basic Apollo mutation wrapper that returns a custom response type, logging errors and guaranteeing state.
// export function tryUseMutationData<TData, TVars>(
//   mut: MutationTuple<TData, TVars>[], initialState?: TData
// ): MutationCollection<TData, TVars> {
//   const log = useLoggerName('GraphQL');
//   const [error, setError] = React.useState<IAlertMessage | undefined>(undefined);
//   const [data, setData] = React.useState<TData | undefined>(initialState);
//   const mutations: MutationMap<TData, TVars> = {};
//   let loading = false;
//   mut.forEach(mutation => {
//     loading = mutation[1].loading || loading;
//     mutations[mutation[0].name] = tryMutation(log, mutation);
//   });
//   return { mutations, error, data, loading };
// }

export function tryUseMutation<TData, TVars>(mut: MutationTuple<TData, TVars>): AsyncMutation<TData, TVars> {
  const log = useLoggerName('GraphQL');
  return tryMutation(log, mut);
}

// Combines multiple mutations into a single result.
export function tryUseMutations<TData, TVars>(
  opt: MutationHookOptions<TData, TVars>,
  ...mut: ((opt: MutationHookOptions<TData, TVars>) => MutationTuple<TData, TVars>)[]
): [IMutationState<TData>, AsyncMutation<TData, TVars>[]] {
  const log = useLoggerName('GraphQL');
  const [error, onError] = React.useState<IAlertMessage | undefined>(undefined);
  const [data, onData] = React.useState<TData | undefined>(undefined);

  function onCompleted(d: TData) {
    onError(undefined);
    onData(d);
  }

  const mutations = mut.map(m => tryMutation(log, m({ ...opt, onError, onCompleted })));
  const result: IMutationState<TData> = { loading: false };
  mutations.forEach(m => {
    if (m.definition[1].loading) result.loading = true;
  });

  return [{ ...result, error, data }, mutations];
}

export async function tryInvokeMutation<TData, TVars>(
  mut: MutationTuple<TData, TVars>, vars: TVars, collection: MutationCollection<TData, TVars>
): Promise<IMutationResult<TData>> {
  const name = mut[0].name;
  const func: AsyncMutation<TData, TVars> | undefined = collection.mutations[name];
  if (!func) throw new Error(`Mutation ${name} was not registered in the collection.`);
  return await func.invoke(vars);
}
//
// export function tryUseMutations<TData, TVars>
// (map: { [key: string]: MutationTuple<TData,TVars> }): { [key: string]: MutationResultAsync<TData, TVars> }
// {
//   const res: { [key: string]: MutationResultAsync<TData, TVars> } = {};
//   Object.keys(map).forEach((key) => {
//     res[key] = tryMutation(map[key]);
//   });
//   return res;
// }

//
// export async function invokeMutation<TData, TVars>(func: AsyncMutation<TData, TVars>, vars: TVars): IMutationResult<TData>
// {
//   const res = await func(vars);
//   return res;
// }