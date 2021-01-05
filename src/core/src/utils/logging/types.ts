export interface LogEntry {
  level: LogLevel;
  context: string;
  location?: string;
  message: unknown[];
}

export type LogLevel = 'verbose' | 'debug' | 'info' | 'error' | 'warn';
