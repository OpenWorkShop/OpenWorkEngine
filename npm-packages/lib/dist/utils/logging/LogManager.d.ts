/// <reference types="node" />
import { EventEmitter } from 'events';
import { LogEntry } from './index';
import { Logger } from './Logger';
import { LogOptions } from './LogOptions';
export declare class LogManager extends EventEmitter {
    private options;
    private consoleLoggerRegistered;
    configure(options?: LogOptions): LogManager;
    getLogger(context: string): Logger;
    getLoggerForFile(filename: string): Logger;
    onLogEntry(listener: (logEntry: LogEntry) => void): LogManager;
    registerConsoleLogger(): LogManager;
}
