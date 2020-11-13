export interface INetworkStatus {
    isOnline: boolean;
    offlineAt?: Date;
}
export declare const useNetworkStatus: () => INetworkStatus;
