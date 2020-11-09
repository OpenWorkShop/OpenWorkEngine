import { LogManager } from './LogManager';
export { useLogger } from './UseLogger';
export { LogManager } from './LogManager';
export declare type LogLevel = 'trace' | 'debug' | 'info' | 'error' | 'warn';
export interface LogEntry {
    level: LogLevel;
    context: string;
    location?: string;
    message: unknown[];
}
declare const logManager: LogManager;
export default logManager;
