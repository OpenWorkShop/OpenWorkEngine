import { TextFieldProps } from '@material-ui/core';
import React from 'react';
interface INumericInputProps {
    numericValue: number;
    onChangeNumericValue: (v: number) => void;
    integersOnly?: boolean;
    min?: number;
    max?: number;
}
declare type NumericInputProps = TextFieldProps & INumericInputProps;
declare const NumericInput: React.FunctionComponent<NumericInputProps>;
export default NumericInput;
