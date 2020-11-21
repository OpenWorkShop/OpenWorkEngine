export declare type DeviceMotionState = Pick<DeviceMotionEvent, 'acceleration' | 'accelerationIncludingGravity' | 'rotationRate' | 'interval'>;
export declare const useDeviceMotion: () => DeviceMotionState;
