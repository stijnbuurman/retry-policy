export type WaitStrategyBuilder = (
  options?: Record<string, unknown>
) => WaitStrategy;
export type WaitStrategy = (
  retryCount: number,
  lastError?: Error
) => number | undefined;
