import { RetryState } from '../RetryState/RetryState';
import { RetryStrategy } from './RetryStrategy';

export class LinearRetryStrategy extends RetryStrategy {
  constructor(protected minTimeout: number, protected maxRetries: number = -1) {
    super();
  }

  public getTimeout(retryCount: number): number {
    return this.minTimeout * retryCount;
  }

  public isRetryAllowed(retryState: RetryState): boolean {
    if (this.maxRetries < 0) {
      return true;
    }
    return retryState.getRetryCount() <= this.maxRetries;
  }
}
