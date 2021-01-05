export interface LogOptions {
  minLevels: { [module: string]: string };
}

export const defaultLogOptions: LogOptions = {
  minLevels: {
    '': 'info',
  },
};

export const developmentLogOptions: LogOptions = {
  minLevels: {
    '': 'debug',
  },
};
