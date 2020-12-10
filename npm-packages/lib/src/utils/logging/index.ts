import LogManager from './LogManager';
export { default as Logger } from './Logger';
export { LogManager };
export * from './types';

const logManager = new LogManager();
export default logManager;
