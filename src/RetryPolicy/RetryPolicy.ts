import { RetryState } from '../';
import {
  allErrorDetectionStrategy,
  IsRetryable
} from '../ErrorDetectionStrategy';
import { delayWithPass } from '../helpers/helpers';
import { IsStopped, neverStopStrategy } from '../StopStrategy';
import { GetWaitTime, linearWaitStrategy } from '../WaitStrategy';

export const RetryPolicy = ({
  errorDetectionStrategies = [allErrorDetectionStrategy()],
  stopStrategy = neverStopStrategy(),
  waitStrategy = linearWaitStrategy()
}: {
  readonly errorDetectionStrategies?: ReadonlyArray<IsRetryable>;
  readonly stopStrategy?: IsStopped;
  readonly waitStrategy?: GetWaitTime;
} = {}) => {
  function handleRetryable(
    error: Error,
    retryState: RetryState
  ): Promise<RetryState> {
    const timeout = waitStrategy(retryState.getRetryCount(), error);
    const newRetryState = retryState.addOneRetry(error);
    return delayWithPass(timeout)(newRetryState);
  }

  function handleFatal(error: Error): Promise<Error> {
    return Promise.reject(error);
  }

  function handleError(
    error: Error,
    retryState: RetryState = new RetryState()
  ): Promise<RetryState | Error> {
    return errorDetectionStrategies.some(isRetryable => isRetryable(error)) &&
      !stopStrategy(retryState.getRetryCount())
      ? handleRetryable(error, retryState)
      : handleFatal(error);
  }

  function executeAsync<T>(
    action: (...args) => Promise<any>,
    retryState: RetryState = new RetryState()
  ): Promise<T> {
    return action().catch(error => {
      return handleError(error, retryState).then(
        (newRetryState: RetryState) => {
          return executeAsync(action, newRetryState);
        }
      );
    });
  }

  return {
    execute: executeAsync,
    handleError
  };
};
