import {fixedWaitStrategy, neverStopStrategy, RetryState, StopStrategy} from '../';
import {allErrorDetectionStrategy, ErrorDetectionStrategy,} from '../ErrorDetectionStrategy';
import {delayWithPass} from '../helpers/helpers';
import type {WaitStrategy} from '../WaitStrategy';

export interface RetryPolicyOptions {
    errorDetectionStrategies?: ErrorDetectionStrategy[];
    stopStrategy?: StopStrategy;
    waitStrategy?: WaitStrategy;
}

export class RetryPolicy {
    public errorDetectionStrategies: ErrorDetectionStrategy[];
    public stopStrategy: StopStrategy;
    public waitStrategy: WaitStrategy;

    constructor(options: RetryPolicyOptions = {}) {
        this.errorDetectionStrategies = options.errorDetectionStrategies || [
            allErrorDetectionStrategy(),
        ];
        this.stopStrategy = options.stopStrategy || neverStopStrategy();
        this.waitStrategy = options.waitStrategy || fixedWaitStrategy({timeout: 0});
    }

    execute<T>(
        action: () => Promise<T>,
        retryState: RetryState = new RetryState()
    ): Promise<T> {
        return action().catch((error) => {
            return this.handleError(error, retryState).then(
                (newRetryState: RetryState) => {
                    return this.execute(action, newRetryState);
                }
            );
        });
    }

    private handleRetryable(error: Error, retryState: RetryState): Promise<RetryState> {
        const timeout = this.waitStrategy(retryState.getRetryCount(), error);

        if (timeout === undefined) {
            return Promise.reject(new Error('Invalid wait time'));
        }

        const newRetryState = retryState.addOneRetry(error);
        return delayWithPass<RetryState>(timeout)(newRetryState);
    }

    private handleFatal(error: Error): Promise<never> {
        return Promise.reject(error);
    }

    private handleError(
        error: Error,
        retryState: RetryState
    ): Promise<RetryState> {
        return this.errorDetectionStrategies.some((isRetryable) =>
            isRetryable(error)
        ) && !this.stopStrategy(retryState.getRetryCount())
            ? this.handleRetryable(error, retryState)
            : this.handleFatal(error);
    }
}
