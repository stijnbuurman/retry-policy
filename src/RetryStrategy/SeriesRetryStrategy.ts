import { RetryStrategy } from './RetryStrategy';

export class SeriesRetryStrategy extends RetryStrategy {
  constructor(protected delaySeries: ReadonlyArray<number>) {
    super(delaySeries.length);
  }

  public getTimeout(attemptNumber: number): number {
    return attemptNumber > this.delaySeries.length
      ? undefined
      : this.delaySeries[attemptNumber - 1];
  }
}
