var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { TextField } from '@material-ui/core';
import React from 'react';
const NumericInput = (props) => {
    const { numericValue, onChangeNumericValue, integersOnly, min, max } = props, tfProps = __rest(props, ["numericValue", "onChangeNumericValue", "integersOnly", "min", "max"]);
    const allowDecimal = !integersOnly;
    const dec = allowDecimal ? '.' : '';
    const [value, setValue] = React.useState(numericValue.toString() || '');
    function getNumericValue(val) {
        if (val === undefined)
            val = value;
        let v = Number(val) || 0;
        if (min !== undefined)
            v = Math.max(v, min);
        if (max !== undefined)
            v = Math.min(v, max);
        if (!allowDecimal)
            v = Math.round(v);
        return v;
    }
    function handleChange(event) {
        let val = event.target.value;
        if (!allowDecimal)
            val = val.replace('.', '');
        setValue(val);
        onChangeNumericValue(getNumericValue(val));
    }
    function makeNumber() {
        setValue(getNumericValue().toString());
    }
    return (React.createElement(TextField, Object.assign({}, tfProps, { value: value, type: 'number', onChange: handleChange, onBlur: () => makeNumber(), inputProps: { inputMode: 'numeric', pattern: `[0-9${dec}\-]*` } })));
};
export default NumericInput;
//# sourceMappingURL=NumericInput.js.map