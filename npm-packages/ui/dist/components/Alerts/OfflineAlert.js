import { useNetworkStatus } from '@openworkshop/lib/utils/device';
import React from 'react';
import { Alert } from '@material-ui/lab';
import { useTranslation, Trans } from 'react-i18next';
const OfflineAlert = (props) => {
    var _a, _b;
    const { isOnline } = useNetworkStatus();
    const { t } = useTranslation();
    if (isOnline)
        return null;
    const severity = (_a = props.severity) !== null && _a !== void 0 ? _a : 'warning';
    const feature = (_b = props.feature) !== null && _b !== void 0 ? _b : t('This feature');
    return (React.createElement(Alert, { severity: severity },
        React.createElement(Trans, null,
            feature,
            " is not available whilst offline.")));
};
export default OfflineAlert;
//# sourceMappingURL=OfflineAlert.js.map