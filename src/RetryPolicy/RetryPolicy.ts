import { FaultRecognizer } from '../FaultRecognizer/FaultRecognizer';
import { RetryState } from '../RetryState/RetryState';
import { RetryStrategy } from '../RetryStrategy/RetryStrategy';

export class RetryPolicy {
  private $retryPromise: Promise<RetryState> = Promise.resolve(
    new RetryState()
  );
  private retryState: RetryState = new RetryState();

  constructor(
    protected retryStrategy: RetryStrategy,
    protected faultRecognizers: ReadonlyArray<FaultRecognizer> = []
  ) {
    this.reset();
  }

  public reset(): void {
    this.retryState = new RetryState();
  }

  public getState(): RetryState {
    return this.retryState;
  }

  public handleSuccess(): void {
    this.reset();
  }

  public handleError(error: Error): Promise<RetryState | Error> {
    if (this.isRetryable(error)) {
      return this.handleRetryable(error);
    }

    return this.handleFatal(error);
  }

  public isRetryable(error: Error): boolean {
    if (!this.faultRecognizers.length) {
      return true;
    }

    for (const faultRecognizer of this.faultRecognizers) {
      if (faultRecognizer.isRetryable(error)) {
        return true;
      }
    }

    return false;
  }

  public handleRetryable(error: Error): Promise<RetryState | Error> {
    const newState = this.retryState.addOneRetry();
    if (!this.retryStrategy.isRetryAllowed(newState)) {
      return this.handleFatal(error);
    }

    this.retryState = newState;
    return (this.$retryPromise = this.makeRetryPromise(newState));
  }

  public makeRetryPromise(retryState: RetryState): Promise<RetryState> {
    const retryTimeout = this.retryStrategy.getTimeout(
      retryState.getRetryCount()
    );

    return new Promise(resolve =>
      setTimeout(() => {
        resolve(retryState);
      }, retryTimeout)
    );
  }

  public handleFatal(error: Error): Promise<Error> {
    this.reset();
    return Promise.reject(error);
  }
}
