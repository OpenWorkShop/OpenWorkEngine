import React from 'react';
// Ported due to many issues with the repository:
// https://github.com/jaredpalmer/the-platform/
export const useNetworkStatus = () => {
    const [status, setStatus] = React.useState(navigator.onLine);
    const [offlineAt, setOfflineAt] = React.useState(undefined);
    React.useEffect(() => {
        const handleOnline = () => {
            setStatus(true);
            setOfflineAt(undefined);
        };
        const handleOffline = () => {
            setStatus(false);
            setOfflineAt(new Date());
        };
        if (typeof window === 'undefined') {
            return;
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return {
        isOnline: status,
        offlineAt,
    };
};
//# sourceMappingURL=NetworkStatus.js.map