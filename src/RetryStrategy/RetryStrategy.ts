import { RetryState } from '../RetryState/RetryState';

export abstract class RetryStrategy {
  public abstract getTimeout(attemptNumber: number): number;
  public abstract isRetryAllowed(retryState: RetryState): boolean;
}
