export declare type DeviceOrientationState = {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
    absolute: boolean;
};
export declare const useDeviceOrientation: () => DeviceOrientationState;
