import 'mocha';
import {NoFaultRecognizer} from "../../src/FaultRecognizer/NoFaultRecognizer";
import {AnyFaultRecognizer} from "../../src/FaultRecognizer/AnyFaultRecognizer";
import {RetryPolicy} from "../../src/RetryPolicy/RetryPolicy";
import {LinearRetryStrategy} from "../../src/RetryStrategy/LinearRetryStrategy";
import * as chai from 'chai';
import {GenericFaultRecognizer} from "../../src/FaultRecognizer/GenericFaultRecognizer";
import {RetryState} from "../../src/RetryState/RetryState";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('RetryPolicy', () => {

    describe('handleError', () => {

        it('should resolve on a retryable error', () => {
            const faultRecognizer = new AnyFaultRecognizer();
            const strategy = new LinearRetryStrategy(0);
            const retryPolicy = new RetryPolicy(strategy, [faultRecognizer]);

            return assert.isFulfilled(retryPolicy.handleError(new Error));
        });

        it('should reject on a fatal error', () => {
            const faultRecognizer = new NoFaultRecognizer();
            const strategy = new LinearRetryStrategy(0);
            const retryPolicy = new RetryPolicy(strategy, [faultRecognizer]);

            return assert.isRejected(retryPolicy.handleError(new RangeError));
        });

    });

    describe('isRetryable', () => {
        it('should return true on retryable error', () => {
            const faultRecognizer = new AnyFaultRecognizer();
            const strategy = new LinearRetryStrategy(0, 0);
            const retryPolicy = new RetryPolicy(strategy, [faultRecognizer]);

            assert.isTrue(retryPolicy.isRetryable(new Error()));
        });

        it('should return false on non-retryable error', () => {
            const faultRecognizer = new NoFaultRecognizer();
            const strategy = new LinearRetryStrategy(0, 0);
            const retryPolicy = new RetryPolicy(strategy, [faultRecognizer]);

            assert.isFalse(retryPolicy.isRetryable(new Error()));
        });

        it('should return true when no faultRecognizer is set', () => {
            const strategy = new LinearRetryStrategy(0, 0);
            const retryPolicy = new RetryPolicy(strategy);

            assert.isTrue(retryPolicy.isRetryable(new Error()));
        });

        it('should recognize retryable errors when using 2 faultRecognizers', () => {
            const faultRecognizer = new GenericFaultRecognizer([RangeError]);
            const faultRecognizer2 = new GenericFaultRecognizer([EvalError]);

            const strategy = new LinearRetryStrategy(0, 0);
            const retryPolicy = new RetryPolicy(strategy, [faultRecognizer, faultRecognizer2]);

            assert.isFalse(retryPolicy.isRetryable(new Error()));
            assert.isTrue(retryPolicy.isRetryable(new EvalError()));
            assert.isTrue(retryPolicy.isRetryable(new RangeError()));
        });
    });

    describe('handleRetryable', () => {
        it('should reject if isRetryable from the RetryStrategy returns false', () => {
            const faultRecognizer = new AnyFaultRecognizer();
            const strategy = new LinearRetryStrategy(0, 0);
            const retryPolicy = new RetryPolicy(strategy, [faultRecognizer]);

            return assert.isRejected(retryPolicy.handleRetryable(new Error));
        });

        it('should modify state on retry', async () => {
            const faultRecognizer = new AnyFaultRecognizer();
            const strategy = new LinearRetryStrategy(10, 1);
            const retryPolicy = new RetryPolicy(strategy, [faultRecognizer]);

            return retryPolicy.handleRetryable(new Error).then(() => {
                assert.equal(retryPolicy.getState().getRetryCount(), 1);
            });
        });

        it('should not reject on fatal error', () => {
            const faultRecognizer = new NoFaultRecognizer();
            const strategy = new LinearRetryStrategy(10, 1);
            const retryPolicy = new RetryPolicy(strategy, [faultRecognizer]);

            return assert.isFulfilled(retryPolicy.handleRetryable(new Error));
        });
    });

    describe('handleFatal', () => {
        it('should return a rejected promise', () => {
            const strategy = new LinearRetryStrategy(10, 1);
            const retryPolicy = new RetryPolicy(strategy);

            return assert.isRejected(retryPolicy.handleFatal(new Error));
        });
    });

    describe('handleSuccess', () => {
        it('should reset the state', async () => {
            const strategy = new LinearRetryStrategy(10, 1);
            const retryPolicy = new RetryPolicy(strategy);

            await assert.isFulfilled(retryPolicy.handleError(new Error));

            assert.equal(retryPolicy.getState().getRetryCount(), 1);

            retryPolicy.handleSuccess();

            assert.equal(retryPolicy.getState().getRetryCount(), 0);
        });
    });

    describe('makeRetryPromise', () => {
        it('should return a promise that resolve after 300 ms', async () => {
            const strategy = new LinearRetryStrategy(100, 1);
            const retryPolicy = new RetryPolicy(strategy);

            let startTime = Date.now();

            let promise = retryPolicy.makeRetryPromise(new RetryState(3));
            await assert.isFulfilled(promise);

            let endTime = Date.now();

            assert.isAtLeast(endTime, startTime + (100 * 3));
            assert.isAtMost(endTime, startTime + (100 * 3) + 10); //minor diff maybe
        });

        it('should return a promise that resolve after 600 ms', async () => {
            const strategy = new LinearRetryStrategy(50, 12);
            const retryPolicy = new RetryPolicy(strategy);

            let startTime = Date.now();

            let promise = retryPolicy.makeRetryPromise(new RetryState(12));
            await assert.isFulfilled(promise);

            let endTime = Date.now();

            assert.isAtLeast(endTime, startTime + (50 * 12));
            assert.isAtMost(endTime, startTime + (50 * 12) + 10); //minor diff maybe
        });
    });
});