import _ from 'lodash';
export function createEnumChecker(enumVariable) {
    const enumValues = Object.values(enumVariable);
    return (value) => enumValues.includes(value);
}
export function createEnumNormalizer(enumVariable) {
    const enumKeys = Object.keys(enumVariable);
    const enumValues = Object.values(enumVariable);
    return (value) => {
        const val = _.find(enumValues, (ev) => ev.toString() === value);
        if (val)
            return val;
        const idx = enumKeys.indexOf(value);
        return idx >= 0 ? enumValues[idx] : undefined;
    };
}
export default {};
//# sourceMappingURL=enums.js.map