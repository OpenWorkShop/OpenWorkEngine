import React from 'react';

export interface INetworkStatus {
  isOnline: boolean;
  offlineAt?: Date;
}

// Ported due to many issues with the repository:
// https://github.com/jaredpalmer/the-platform/
export const useNetworkStatus = (): INetworkStatus => {
  const [status, setStatus] = React.useState(navigator.onLine);
  const [offlineAt, setOfflineAt] = React.useState<Date | undefined>(undefined);

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
