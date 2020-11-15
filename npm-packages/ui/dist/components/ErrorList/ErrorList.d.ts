import { IApiError } from '@openworkshop/lib/api/ApiCall';
import React from 'react';
interface IApiErrorListProps {
    apiErrors?: Array<IApiError>;
    errorMessages?: Array<string>;
}
declare const ErrorList: React.FunctionComponent<IApiErrorListProps>;
export default ErrorList;
