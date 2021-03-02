import {TextField, TextFieldProps} from '@material-ui/core';
import React from 'react';

interface INumericInputProps {
  numericValue: number;
  onChangeNumericValue: (v: number) => void;
  integersOnly?: boolean;
  min?: number;
  max?: number;
}

type NumericInputProps = TextFieldProps & INumericInputProps;

const NumericInput: React.FunctionComponent<NumericInputProps> = (props) => {
  const { numericValue, onChangeNumericValue, integersOnly, min, max, className, style, ...tfProps } = props;
  const allowDecimal = !integersOnly;
  const dec = allowDecimal ? '.' : '';
  const [value, setValue] = React.useState<string>(numericValue.toString() || '');

  function getNumericValue(val?: string | number): number {
    if (val === undefined) val = value;

    let v: number = Number(val) || 0;
    if (min !== undefined) v = Math.max(v, min);
    if (max !== undefined) v = Math.min(v, max);
    if (!allowDecimal) v = Math.round(v);

    return v;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let val = event.target.value;
    if (!allowDecimal) val = val.replace('.', '');

    setValue(val);
    onChangeNumericValue(getNumericValue(val));
  }

  function makeNumber() {
    setValue(getNumericValue().toString());
  }

  return (
    <TextField
      {...tfProps}
      value={value}
      type='number'
      onChange={handleChange}
      onBlur={() => makeNumber()}
      className={className}
      style={style}
      inputProps={{ inputMode: 'numeric', style: { ...style, textAlign: 'right' }, pattern: `[0-9${dec}\-]*` }}
    />
  );
};

export default NumericInput;
