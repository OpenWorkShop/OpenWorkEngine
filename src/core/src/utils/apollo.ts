import {MutationFunctionOptions, MutationTuple} from '@apollo/client/react/types/types';
import {IAlertMessage} from '../components';
import {FetchResult} from '@apollo/client/link/core';
import {useLoggerName} from './logging/UseLogger';

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