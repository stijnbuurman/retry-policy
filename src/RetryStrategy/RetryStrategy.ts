import { RetryState } from '../RetryState/RetryState';

export abstract class RetryStrategy {
  constructor(protected maxRetries: number = -1) {}

  public abstract getTimeout(attemptNumber: number): number;

  public isRetryAllowed(retryState: RetryState): boolean {
    return this.maxRetries < 0
      ? true
      : retryState.getRetryCount() < this.maxRetries;
  }
}
