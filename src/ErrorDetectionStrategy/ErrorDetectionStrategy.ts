export type ErrorDetectionStrategy = (options?: {}) => IsRetryable;
export type IsRetryable = (error: Error) => boolean;
