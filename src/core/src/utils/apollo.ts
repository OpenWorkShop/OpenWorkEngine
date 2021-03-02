import {
  MutationFunctionOptions,
  MutationTuple
} from '@apollo/client/react/types/types';
import {IAlertMessage} from '../components';
import {FetchResult} from '@apollo/client/link/core';
import {useLoggerName} from './logging/UseLogger';
// import {useLoggerName} from './logging/UseLogger';
// import {IAlertMessage} from '../components';
// import React from 'react';
// import {Logger} from './logging';


export type MutationInvoker<TData, TVars> = (options?: MutationFunctionOptions<TData, TVars>) => Promise<FetchResult<TData>>;

export function useSafeMutation<TData, TVars>(
  mut: MutationTuple<TData, TVars>, onData?: (d: TData) => void, onError?: (e: IAlertMessage) => void
): MutationTuple<TData, TVars> {
  const log = useLoggerName('GraphQL');
  const wrap: MutationInvoker<TData, TVars> = async (opts) => {
    let error: IAlertMessage | undefined = undefined;
    let res: FetchResult<TData> = {};
    try {
      res = (await mut[0](opts)) ?? {};
      if (res.data) {
        if (onData) onData(res.data);
        return res;
      }
    } catch (e) {
      log.error(e, opts);
      error = e;
    }
    if (!error) error = new Error('No data returned.');
    if (onError) onError(error);
    return { ...res, error };
  };
  return [wrap, mut[1]];
}

//
// export interface IMutationResult<TData> {
//   error?: IAlertMessage;
//   data?: TData;
// }
//
// export interface IMutationState<TData> extends IMutationResult<TData> {
//   loading: boolean;
// }
//
// // export type AsyncMutation<TData, TVars> = {
// //   definition: MutationTuple<TData, TVars>;
// //   invoke: (vars?: TVars) => Promise<IMutationResult<TData>>;
// // }
// // //
// // // // Wrap a MutationTuple (definition) into a try/catch block and return an async function to invoke it.
// // // function tryMutation<TData, TVars>(log: Logger, mutation: MutationTuple<TData, TVars>): AsyncMutation<TData, unknown> {
// // //   const invoke = async (variables?: TVars, opts?: MutationFunctionOptions<TData, TVars>) => {
// // //   };
// // //   return { definition: mutation as MutationTuple<TData, unknown>, invoke: (v) => invoke(v as TVars) };
// // // }
// //
// // export type MutationMap<TData, TVars> = { [key: string]: AsyncMutation<TData, TVars> };
// // //
// // // export type MutationCollection<TData, TVars> = IMutationResult<TData> & {
// // //   loading: boolean;
// // //   mutations: MutationMap<TData, TVars>;
// // // }
// //
// // // Basic Apollo mutation wrapper that returns a custom response type, logging errors and guaranteeing state.
// // // export function tryUseMutationData<TData, TVars>(
// // //   mut: MutationTuple<TData, TVars>[], initialState?: TData
// // // ): MutationCollection<TData, TVars> {
// // //   const log = useLoggerName('GraphQL');
// // //   const [error, setError] = React.useState<IAlertMessage | undefined>(undefined);
// // //   const [data, setData] = React.useState<TData | undefined>(initialState);
// // //   const mutations: MutationMap<TData, TVars> = {};
// // //   let loading = false;
// // //   mut.forEach(mutation => {
// // //     loading = mutation[1].loading || loading;
// // //     mutations[mutation[0].name] = tryMutation(log, mutation);
// // //   });
// // //   return { mutations, error, data, loading };
// // // }
// // //
// // // export function tryUseMutation<TData, TVars>(mut: MutationTuple<TData, TVars>): AsyncMutation<TData, TVars> {
// // //   const log = useLoggerName('GraphQL');
// // //   return tryMutation(log, mut);
// // // }
// //
// // export type MutationKey = string | number | symbol;
//
// // A callback function implemented by the caller to create the mutation (i.e., call useXXXMutation)
// export type MutationBuilder<TData, TVars> = (opts: MutationHookOptions<TData>) => MutationTuple<TData, TVars>;
// //
// // // A map of builders, used to define mutations
// // export type MutationDefinitions<TData> = MutationBuilder<TData>[];
// // //Record<TKey, MutationBuilder<TData, TVars>>;
// // //{ [key: string]: MutationBuilder<TKey, TData, TVars> };
// // //
// // // export type MutationCollection<TKey, TData, TVars> = {
// // // }
// //
// // export interface IMutationCollection<TData> {
// //   state: IMutationState<TData>;
// //   mutations: { [key: string]: MutationTuple<TData, unknown> };
// // }
// //
// //
// // // Wrap a MutationTuple (definition) into a try/catch block and return an async function to invoke it.
// // export async function tryMutation<TData, TVars>(
// //   log: Logger, mutation: MutationTuple<TData, TVars>, options?: MutationFunctionOptions<TData, TVars>
// // ): Promise<IMutationResult<TData>> {
// //   let error: IAlertMessage | undefined = undefined;
// //   try {
// //     log.debug('[MUTATION]', options);
// //     const result = (await mutation[0](options)) ?? undefined;
// //     if (result.data) {
// //       return { data: result.data };
// //     }
// //   } catch (e) {
// //     log.error(e, options);
// //     error = e;
// //   }
// //   return { error };
// // }
//
// class MutationCollection<TData> {
//   state: IMutationState<TData>;
//   mutations: { [key: string]: MutationTuple<TData, unknown> };
//
//   private _key: string | undefined;
//   private _log: Logger;
//   private _opts: MutationHookOptions<TData>;
//
//   constructor(log: Logger, state: IMutationState<TData>, opts: MutationHookOptions<TData>) {
//     this._log = log;
//     this._opts = opts;
//     this.state = state;
//     this.mutations = {};
//   }
//
//   checkKey<TKey extends string>(key: TKey): boolean {
//     if (!this._key) return true;
//     return this._key === typeof key.constructor.name;
//   }
//
//   private async invoke<TKey extends string, TVars>(key?: TKey, variables?: TVars) {
//     let error: IAlertMessage | undefined = undefined;
//     try {
//       const mutation = this.mutations[key ?? ''];
//       this._log.debug('[MUTATION]', variables);
//       const opts = variables ? { variables } : {};
//       const result = (await mutation[0](opts)) ?? undefined;
//       if (result.data) {
//         return { data: result.data };
//       }
//     } catch (e) {
//       this._log.error(e, variables);
//       error = e;
//     }
//     if (!error) {
//       this._log.error('[EMPTY]', variables);
//       error = new Error('Empty response from server');
//     }
//     return { error };
//   }
//
//   private assignMutation<TVars>(key: string, builder: MutationBuilder<TData, TVars>) {
//     this._log.debug('Assign', this._key, 'with', key);
//     this.mutations[key] = builder(this._opts);
//     if (this.mutations[key].definition[1].loading) {
//       this.state.loading = true;
//     }
//   }
//
//   withSoloMutation<TVars>(builder: MutationBuilder<TData, TVars>): MutationCollection<TData> {
//     this._key = '';
//     this.assignMutation('', builder);
//     return this;
//   }
//
//   withMutation<TKey extends string, TVars>(key: TKey, builder: MutationBuilder<TData, TVars>): MutationCollection<TData> {
//     if (!this.checkKey(key)) {
//       throw new Error(`Invalid key ${key}`);
//     }
//     this._key = typeof key.constructor.name;
//     this.assignMutation(key, builder);
//     return this;
//   }
// }
//
// export function useMutationsResult<TData>(...mutations: MutationTuple<TData, unknown>[]): IMutationResult<TData> {
//   const log = useLoggerName('GraphQL');
//   const [error, onError] = React.useState<IAlertMessage | undefined>(undefined);
//   const [data, onData] = React.useState<TData | undefined>(undefined);
//   const opts = { onError, onCompleted };
//   const state = { error, data, loading: false };
//
//   function onCompleted(d: TData) {
//     onError(undefined);
//     onData(d);
//   }
//
//   mutations.forEach(m => {
//     if (m.loading) state.loading = true;
//   });
//
//   return  new MutationCollection<TData>(log, state, opts);
// }
// //
// // export function useMutationCollection<TData>(): MutationCollection<TData> {
// //   const log = useLoggerName('GraphQL');
// //   const [error, onError] = React.useState<IAlertMessage | undefined>(undefined);
// //   const [data, onData] = React.useState<TData | undefined>(undefined);
// //   const opts = { onError, onCompleted };
// //   const state = { error, data, loading: false };
// //
// //   function onCompleted(d: TData) {
// //     onError(undefined);
// //     onData(d);
// //   }
// //
// //   return  new MutationCollection<TData>(log, state, opts);
// // }
//
// // export type MutationImplementations<TKey extends string, TData, TVars> = { [key in TKey]: AsyncMutation<TData, TVars> };
// //
// // export type MutationTemplate<TData, TVars> =
// //   [((opt: MutationHookOptions<TData, TVars>) => MutationTuple<TData, TVars>), MutationHookOptions<TData, TVars>];
// //
// // export type MutationHookResponse<TKey extends string, TData, TVars> = IMutationState<TData> & {
// //   invoke: MutationImplementations<TKey, TData, TVars>;
// // }
// //
// // // Combines multiple mutations into a single result.
// // export function tryUseMutations<TKey extends string, TData, TVars>(
// //   mut: MutationDefinitions<TKey, TData, TVars>
// // ): MutationHookResponse<TKey, TData, TVars> {
// //   const log = useLoggerName('GraphQL');
// //   const [error, onError] = React.useState<IAlertMessage | undefined>(undefined);
// //   const [data, onData] = React.useState<TData | undefined>(undefined);
// //
// //   function onCompleted(d: TData) {
// //     onError(undefined);
// //     onData(d);
// //   }
// //
// //   // Object.entries(mut).forEach(o => {
// //   //   const k: string = o[0];
// //   //   const builder: MutationBuilder<TData, TVars> = o[1];
// //   // });
// //
// //   const opts = { onError, onCompleted };
// //   const invoke: MutationImplementations<TKey, TData, TVars> =
// //     _.keyBy<key in TKey, AsyncMutation<TData, TVars>>(Object.keys(mut), m => tryMutation(log, mut[m as TKey](opts)));
// //   //
// //   // for (const [key, builder] of Object.entries(mut)) {
// //   //   const mutation: MutationTuple<TData, TVars> = builder({ onError, onCompleted });
// //   //   mutations.push(tryMutation(log, mutation));
// //   // }
// //   //
// //   // // const mutations = mut.map(m => tryMutation(log, m[0]({ ...(m[1] || {}), onError, onCompleted })));
// //   const result: IMutationState<TData> = { loading: false };
// //   // mutations.forEach(m => {
// //   //   if (m.definition[1].loading) result.loading = true;
// //   // });
// //
// //   return { ...result, error, data, invoke };
// // }
// //
// // export async function tryInvokeMutation<TData, TVars>(
// //   mut: MutationTuple<TData, TVars>, vars: TVars, collection: MutationCollection<TData, TVars>
// // ): Promise<IMutationResult<TData>> {
// //   const name = mut[0].name;
// //   const func: AsyncMutation<TData, TVars> | undefined = collection.mutations[name];
// //   if (!func) throw new Error(`Mutation ${name} was not registered in the collection.`);
// //   return await func.invoke(vars);
// // }
// //
// // export function tryUseMutations<TData, TVars>
// // (map: { [key: string]: MutationTuple<TData,TVars> }): { [key: string]: MutationResultAsync<TData, TVars> }
// // {
// //   const res: { [key: string]: MutationResultAsync<TData, TVars> } = {};
// //   Object.keys(map).forEach((key) => {
// //     res[key] = tryMutation(map[key]);
// //   });
// //   return res;
// // }
//
// //
// // export async function invokeMutation<TData, TVars>(func: AsyncMutation<TData, TVars>, vars: TVars): IMutationResult<TData>
// // {
// //   const res = await func(vars);
// //   return res;
// // }