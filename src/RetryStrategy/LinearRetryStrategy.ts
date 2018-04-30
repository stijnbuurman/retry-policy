import { RetryStrategy } from './RetryStrategy';

export class LinearRetryStrategy extends RetryStrategy {
  constructor(protected baseDelay: number, maxRetries?: number) {
    super(maxRetries);
  }

  public getTimeout(retryCount: number): number {
    return this.baseDelay * retryCount;
  }
}
