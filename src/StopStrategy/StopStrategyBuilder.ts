export type StopStrategyBuilder = (
  options?: Record<string, unknown>
) => StopStrategy;
export type StopStrategy = (retryCount: number) => boolean;
