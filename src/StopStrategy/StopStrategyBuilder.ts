export type StopStrategyBuilder = (options?: {}) => StopStrategy;
export type StopStrategy = (retryCount: number) => boolean;
