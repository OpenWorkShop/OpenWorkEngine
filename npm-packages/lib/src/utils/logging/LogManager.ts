import { EventEmitter } from 'events';
import { LogEntry } from './index';
import { Logger } from './Logger';
import JsLogger from 'js-logger';
import { LogOptions, defaultLogOptions } from './LogOptions';

export class LogManager extends EventEmitter {
  private options: LogOptions = { ...defaultLogOptions };

  // Prevent the console logger from being added twice
  private consoleLoggerRegistered = false;

  public configure(options?: LogOptions): LogManager {
    this.options = Object.assign({}, this.options ?? {}, options);
    JsLogger.useDefaults();
    return this;
  }

  public getLogger(context: string): Logger {
    let minLevel = 'none';
    let match = '';

    for (const key in this.options.minLevels) {
      if (context.startsWith(key) && key.length >= match.length) {
        minLevel = this.options.minLevels[key];
        match = key;
      }
    }

    return new Logger(this, context, minLevel);
  }

  public getLoggerForFile(filename: string): Logger {
    const firstPart = filename.split('/').pop() as string;
    return this.getLogger(firstPart.split('.').shift() as string);
  }

  public onLogEntry(listener: (logEntry: LogEntry) => void): LogManager {
    this.on('log', listener);
    return this;
  }

  public registerConsoleLogger(): LogManager {
    if (this.consoleLoggerRegistered) return this;

    this.onLogEntry((logEntry: LogEntry) => {
      const parts: unknown[] = [`[${new Date().getTime()}]`];
      // if (logEntry.location) {
      //   parts.push(logEntry.location);
      // }
      if (logEntry.context && logEntry.context.length > 0) {
        parts.push(`[${logEntry.context}]`);
      }
      const msg = parts.concat(logEntry.message);
      if (logEntry.level === 'verbose') {
        JsLogger.trace(...msg);
      } else if (logEntry.level === 'debug') {
        JsLogger.debug(...msg);
      } else if (logEntry.level === 'info') {
        JsLogger.info(...msg);
      } else if (logEntry.level === 'warn') {
        JsLogger.warn(...msg);
      } else if (logEntry.level === 'error') {
        JsLogger.error(...msg);
      } else {
        JsLogger.log(...msg);
      }
    });

    this.consoleLoggerRegistered = true;
    return this;
  }
}
