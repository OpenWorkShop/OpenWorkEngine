import { LogManager } from "./LogManager";
export { LogManager } from "./LogManager";

export type LogLevel = "trace" | "debug" | "info" | "error" | "warn";

export interface LogEntry {
  level: LogLevel;
  context: string;
  location?: string;
  message: any[];
}

const logManager = new LogManager();
export default logManager;
