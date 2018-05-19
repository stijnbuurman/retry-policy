export type StopStrategy = (options?: {}) => IsStopped;
export type IsStopped = (retryCount: number) => boolean;
