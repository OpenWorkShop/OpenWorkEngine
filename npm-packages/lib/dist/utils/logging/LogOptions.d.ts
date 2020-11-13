export interface LogOptions {
    minLevels: {
        [module: string]: string;
    };
}
export declare const defaultLogOptions: LogOptions;
export declare const developmentLogOptions: LogOptions;
