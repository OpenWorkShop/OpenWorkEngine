export declare function createEnumChecker<T extends string, TEnumValue extends string>(enumVariable: {
    [key in T]: TEnumValue;
}): (value: string) => value is TEnumValue;
export declare function createEnumNormalizer<T extends string, TEnumValue extends string>(enumVariable: {
    [key in T]: TEnumValue;
}): (value: string) => TEnumValue | undefined;
declare const _default: {};
export default _default;
