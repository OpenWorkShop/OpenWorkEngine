/// <reference types="node" />
import { LogLevel } from './index';
export declare class Logger {
    private logManager;
    private readonly minLevel;
    private readonly module;
    private readonly levels;
    constructor(logManager: NodeJS.EventEmitter, module: string, minLevel: string);
    /**
     * Converts a string level (trace/debug/info/warn/error) into a number
     *
     * @param minLevel
     */
    private levelToInt;
    /**
     * Central logging method.
     * @param logLevel
     * @param args
     */
    log(logLevel: LogLevel, ...args: unknown[]): void;
    trace(...args: unknown[]): void;
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}
