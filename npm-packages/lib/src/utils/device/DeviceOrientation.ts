import React from 'react';

export type DeviceOrientationState = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  absolute: boolean;
};

export const useDeviceOrientation = (): DeviceOrientationState => {
  const [orientation, setOrientation] = React.useState<DeviceOrientationState>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
  });

  const handle = (e: DeviceOrientationEvent) => {
    setOrientation({
      beta: e.beta,
      alpha: e.alpha,
      gamma: e.gamma,
      absolute: e.absolute,
    });
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener('deviceorientation', handle);

    return () => {
      window.removeEventListener('deviceorientation', handle);
    };
  }, []);

  return orientation;
};
