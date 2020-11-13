import React from 'react';
interface IOfflineAlertProps {
    severity?: 'warning' | 'error';
    feature?: string;
}
declare const OfflineAlert: React.FunctionComponent<IOfflineAlertProps>;
export default OfflineAlert;
