export type WaitStrategy = (options?: {}) => GetWaitTime;
export type GetWaitTime = (retryCount: number, lastError?: Error) => number;
