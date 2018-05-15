import {
  AllErrorDetectionStrategy,
  ErrorDetectionStrategy
} from '../ErrorDetectionStrategy';
import { delayWithPass } from '../helpers/helpers';
import { RetryState } from '../RetryState/RetryState';
import { RetryStrategy } from '../RetryStrategy';

export class RetryPolicy {
  constructor(
    protected retryStrategy: RetryStrategy,
    protected errorDetectionStrategies: ReadonlyArray<
      ErrorDetectionStrategy
    > = [new AllErrorDetectionStrategy()]
  ) {}

  public handleError(
    error: Error,
    retryState: RetryState = new RetryState(0)
  ): Promise<RetryState | Error> {
    return this.isRetryable(error)
      ? this.handleRetryable(error, retryState)
      : this.handleFatal(error);
  }

  public isRetryable(error: Error): boolean {
    return !!this.errorDetectionStrategies.find(errorStrategy => {
      return errorStrategy.isRetryable(error);
    });
  }

  public handleRetryable(
    error: Error,
    retryState: RetryState = new RetryState(0)
  ): Promise<RetryState | Error> {
    return this.retryStrategy.isRetryAllowed(retryState)
      ? this.makeRetryPromise(retryState.addOneRetry())
      : this.handleFatal(error);
  }

  public handleFatal(error: Error): Promise<Error> {
    return Promise.reject(error);
  }

  protected makeRetryPromise(retryState: RetryState): Promise<RetryState> {
    const retryTimeout = this.retryStrategy.getTimeout(
      retryState.getRetryCount()
    );

    return delayWithPass(retryTimeout)(retryState);
  }
}
