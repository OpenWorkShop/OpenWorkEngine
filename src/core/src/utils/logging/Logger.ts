import {LogEntry, LogLevel} from './types';
import LogManager from './LogManager';

class Logger {
  public logManager: LogManager;
  private readonly minLevel: number;
  private readonly module: string;
  private readonly levels: { [key: string]: number } = {
    verbose: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
  };

  constructor(
    logManager: LogManager,
    module: string,
    minLevel: string
  ) {
    this.logManager = logManager;
    this.module = module;
    this.minLevel = this.levelToInt(minLevel);
  }

  /**
   * Converts a string level (trace/debug/info/warn/error) into a number
   *
   * @param minLevel
   */
  private levelToInt(minLevel: string): number {
    if (minLevel.toLowerCase() in this.levels)
      return this.levels[minLevel.toLowerCase()];
    else return 99;
  }

  /**
   * Central logging method.
   * @param logLevel
   * @param args
   */
  public log(logLevel: LogLevel, ...args: unknown[]): void {
    const level = this.levelToInt(logLevel);
    if (level < this.minLevel) return;

    const logEntry: LogEntry = {
      level: logLevel,
      context: this.module,
      message: args,
    };

    // Obtain the line/file through a thoroughly hacky method
    // This creates a new stack trace and pulls the caller from it.  If the caller
    // if .trace()
    // const error = new Error('');
    // if (error.stack) {
    //   const cla = error.stack.split('\n');
    //   let idx = 1;
    //   while (idx < cla.length && cla[idx].includes('at Logger.Object.')) idx++;
    //   if (idx < cla.length) {
    //     logEntry.location = cla[idx].slice(cla[idx].indexOf('at ') + 3, cla[idx].length);
    //   }
    // }

    this.logManager.emit('log', logEntry);
  }

  public verbose(...args: unknown[]): void {
    this.log('verbose', ...args);
  }

  public debug(...args: unknown[]): void {
    this.log('debug', ...args);
  }
  public info(...args: unknown[]): void {
    this.log('info', ...args);
  }
  public warn(...args: unknown[]): void {
    this.log('warn', ...args);
  }
  public error(...args: unknown[]): void {
    this.log('error', ...args);
  }
}

export default Logger;
