import { EventEmitter } from 'events';
import { Logger } from './Logger';
import JsLogger from 'js-logger';
import { defaultLogOptions } from './LogOptions';
export class LogManager extends EventEmitter {
    constructor() {
        super(...arguments);
        this.options = Object.assign({}, defaultLogOptions);
        // Prevent the console logger from being added twice
        this.consoleLoggerRegistered = false;
    }
    configure(options) {
        var _a;
        this.options = Object.assign({}, (_a = this.options) !== null && _a !== void 0 ? _a : {}, options);
        JsLogger.useDefaults();
        return this;
    }
    getLogger(context) {
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
    getLoggerForFile(filename) {
        const firstPart = filename.split('/').pop();
        return this.getLogger(firstPart.split('.').shift());
    }
    onLogEntry(listener) {
        this.on('log', listener);
        return this;
    }
    registerConsoleLogger() {
        if (this.consoleLoggerRegistered)
            return this;
        this.onLogEntry((logEntry) => {
            const parts = [];
            // if (logEntry.location) {
            //   parts.push(logEntry.location);
            // }
            if (logEntry.context && logEntry.context.length > 0) {
                parts.push(`[${logEntry.context}]`);
            }
            const msg = parts.concat(logEntry.message);
            if (logEntry.level === 'trace') {
                JsLogger.trace(...msg);
            }
            else if (logEntry.level === 'debug') {
                JsLogger.debug(...msg);
            }
            else if (logEntry.level === 'info') {
                JsLogger.info(...msg);
            }
            else if (logEntry.level === 'warn') {
                JsLogger.warn(...msg);
            }
            else if (logEntry.level === 'error') {
                JsLogger.error(...msg);
            }
            else {
                JsLogger.log(...msg);
            }
        });
        this.consoleLoggerRegistered = true;
        return this;
    }
}
//# sourceMappingURL=LogManager.js.map