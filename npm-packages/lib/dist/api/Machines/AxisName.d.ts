import { AxisName } from '../graphql';
export declare const isAxisName: (value: string) => value is AxisName;
export declare const normalizeAxisName: (value: string) => AxisName | undefined;
