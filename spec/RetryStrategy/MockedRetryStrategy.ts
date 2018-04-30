import { RetryStrategy } from '../../src/RetryStrategy';

export class MockedRetryStrategy extends RetryStrategy {
  public getTimeout(attemptNumber: number): number {
    return undefined;
  }
}
