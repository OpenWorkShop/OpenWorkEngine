/// <reference types="node" />
import { LogLevel } from "./index";
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
     * @param message
     */
    log(logLevel: LogLevel, ...args: any[]): void;
    trace(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
