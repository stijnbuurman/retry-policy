import { RetryState } from '../';
import { allErrorDetectionStrategy } from '../ErrorDetectionStrategy';
import { IsRetryable } from '../ErrorDetectionStrategy/ErrorDetectionStrategy';
import { delayWithPass } from '../helpers/helpers';
import { afterAttemptStopStrategy } from '../StopStrategy';
import { IsStopped } from '../StopStrategy/StopStrategy';
import { linearWaitStrategy } from '../WaitStrategy';
import { GetWaitTime } from '../WaitStrategy/WaitStrategy';

export const RetryPolicy = ({
  errorDetectionStrategies = [allErrorDetectionStrategy()],
  stopStrategy = afterAttemptStopStrategy(),
  waitStrategy = linearWaitStrategy()
}: {
  readonly errorDetectionStrategies?: ReadonlyArray<IsRetryable>;
  readonly stopStrategy?: IsStopped;
  readonly waitStrategy?: GetWaitTime;
}) => {
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

  return (
    error: Error,
    retryState: RetryState = new RetryState()
  ): Promise<RetryState | Error> => {
    return errorDetectionStrategies.some(isRetryable => isRetryable(error)) &&
      !stopStrategy(retryState.getRetryCount())
      ? handleRetryable(error, retryState)
      : handleFatal(error);
  };
};
