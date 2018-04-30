import { RetryStrategy } from './RetryStrategy';

export class ExponentialRetryStrategy extends RetryStrategy {
  constructor(protected minTimeout: number, maxRetries?: number) {
    super(maxRetries);
  }

  public getTimeout(retryCount: number): number {
    return this.minTimeout * 2 ** (retryCount - 1);
  }
}
