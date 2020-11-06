export class Logger {
    constructor(logManager, module, minLevel) {
        this.levels = {
            trace: 1,
            debug: 2,
            info: 3,
            warn: 4,
            error: 5,
        };
        this.logManager = logManager;
        this.module = module;
        this.minLevel = this.levelToInt(minLevel);
    }
    /**
     * Converts a string level (trace/debug/info/warn/error) into a number
     *
     * @param minLevel
     */
    levelToInt(minLevel) {
        if (minLevel.toLowerCase() in this.levels)
            return this.levels[minLevel.toLowerCase()];
        else
            return 99;
    }
    /**
     * Central logging method.
     * @param logLevel
     * @param message
     */
    log(logLevel, ...args) {
        const level = this.levelToInt(logLevel);
        if (level < this.minLevel)
            return;
        const logEntry = {
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
        this.logManager.emit("log", logEntry);
    }
    trace(...args) {
        this.log("trace", ...args);
    }
    debug(...args) {
        this.log("debug", ...args);
    }
    info(...args) {
        this.log("info", ...args);
    }
    warn(...args) {
        this.log("warn", ...args);
    }
    error(...args) {
        this.log("error", ...args);
    }
}
//# sourceMappingURL=Logger.js.map