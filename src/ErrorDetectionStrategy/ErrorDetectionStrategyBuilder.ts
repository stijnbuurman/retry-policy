export type ErrorDetectionStrategyBuilder = (
  options?: Record<string, unknown>
) => ErrorDetectionStrategy;

export type ErrorDetectionStrategy = (error: Error) => boolean;
