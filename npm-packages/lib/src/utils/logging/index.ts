import { LogManager } from './LogManager';
export { LogManager } from './LogManager';

export type LogLevel = 'verbose' | 'debug' | 'info' | 'error' | 'warn';

export interface LogEntry {
  level: LogLevel;
  context: string;
  location?: string;
  message: unknown[];
}

const logManager = new LogManager();
export default logManager;
