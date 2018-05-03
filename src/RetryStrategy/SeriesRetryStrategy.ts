import { RetryStrategy } from './RetryStrategy';

export class SeriesRetryStrategy extends RetryStrategy {
  constructor(protected delaySeries: ReadonlyArray<number>) {
    super(delaySeries.length);
  }

  public getTimeout(attemptNumber: number): number {
    if (attemptNumber > this.delaySeries.length) {
      throw new Error('No timeout for this attemptNumber.');
    }

    return this.delaySeries[attemptNumber - 1];
  }
}
