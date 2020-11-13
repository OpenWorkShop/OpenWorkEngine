import React from 'react';

export type DeviceMotionState = Pick<
  DeviceMotionEvent,
  'acceleration' | 'accelerationIncludingGravity' | 'rotationRate' | 'interval'
>;

export const useDeviceMotion = (): DeviceMotionState => {
  const [motion, setMotion] = React.useState<DeviceMotionState>({
    acceleration: {
      x: null,
      y: null,
      z: null,
    },
    accelerationIncludingGravity: {
      x: null,
      y: null,
      z: null,
    },
    rotationRate: {
      alpha: null,
      beta: null,
      gamma: null,
    },
    interval: 0,
  });

  React.useEffect(() => {
    const handle = (deviceMotionEvent: DeviceMotionEvent) => {
      setMotion(deviceMotionEvent);
    };

    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('devicemotion', handle);

    return () => {
      window.removeEventListener('devicemotion', handle);
    };
  }, []);

  return motion;
};
