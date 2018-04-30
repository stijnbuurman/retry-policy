import { LinearRetryStrategy, RetryPolicy, RetryState } from '../../src';
import {
  AllErrorDetectionStrategy,
  GenericErrorDetectionStrategy,
  NoErrorDetectionStrategy
} from '../../src/ErrorDetectionStrategy';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('RetryPolicy', () => {
  describe('handleError', () => {
    it('should resolve on a retryable error', () => {
      const errorDetectionStrategy = new AllErrorDetectionStrategy();
      const strategy = new LinearRetryStrategy(0);
      const retryPolicy = new RetryPolicy(strategy, [errorDetectionStrategy]);

      return assert.isFulfilled(retryPolicy.handleError(new Error()));
    });

    it('should reject on a fatal error', () => {
      const errorDetectionStrategy = new NoErrorDetectionStrategy();
      const strategy = new LinearRetryStrategy(0);
      const retryPolicy = new RetryPolicy(strategy, [errorDetectionStrategy]);

      return assert.isRejected(retryPolicy.handleError(new RangeError()));
    });
  });

  describe('isRetryable', () => {
    it('should return true on retryable error', () => {
      const errorDetectionStrategy = new AllErrorDetectionStrategy();
      const strategy = new LinearRetryStrategy(0, 0);
      const retryPolicy = new RetryPolicy(strategy, [errorDetectionStrategy]);

      assert.isTrue(retryPolicy.isRetryable(new Error()));
    });

    it('should return false on non-retryable error', () => {
      const errorDetectionStrategy = new NoErrorDetectionStrategy();
      const strategy = new LinearRetryStrategy(0, 0);
      const retryPolicy = new RetryPolicy(strategy, [errorDetectionStrategy]);

      assert.isFalse(retryPolicy.isRetryable(new Error()));
    });

    it('should return true when no errorDetectionStrategy is set', () => {
      const strategy = new LinearRetryStrategy(0, 0);
      const retryPolicy = new RetryPolicy(strategy);

      assert.isTrue(retryPolicy.isRetryable(new Error()));
    });

    it('should recognize retryable errors when using 2 errorDetectionStrategies', () => {
      const errorDetectionStrategy = new GenericErrorDetectionStrategy([
        RangeError
      ]);
      const errorDetectionStrategy2 = new GenericErrorDetectionStrategy([
        EvalError
      ]);

      const strategy = new LinearRetryStrategy(0, 0);
      const retryPolicy = new RetryPolicy(strategy, [
        errorDetectionStrategy,
        errorDetectionStrategy2
      ]);

      assert.isFalse(retryPolicy.isRetryable(new Error()));
      assert.isTrue(retryPolicy.isRetryable(new EvalError()));
      assert.isTrue(retryPolicy.isRetryable(new RangeError()));
    });
  });

  describe('handleRetryable', () => {
    it('should reject if isRetryable from the RetryStrategy returns false', () => {
      const errorDetectionStrategy = new AllErrorDetectionStrategy();
      const strategy = new LinearRetryStrategy(0, 0);
      const retryPolicy = new RetryPolicy(strategy, [errorDetectionStrategy]);

      return assert.isRejected(retryPolicy.handleRetryable(new Error()));
    });

    it('should modify state on retry', async () => {
      const errorDetectionStrategy = new AllErrorDetectionStrategy();
      const strategy = new LinearRetryStrategy(10, 1);
      const retryPolicy = new RetryPolicy(strategy, [errorDetectionStrategy]);

      return retryPolicy.handleRetryable(new Error()).then(() => {
        assert.equal(retryPolicy.getState().getRetryCount(), 1);
      });
    });

    it('should not reject on fatal error', () => {
      const errorDetectionStrategy = new NoErrorDetectionStrategy();
      const strategy = new LinearRetryStrategy(10, 1);
      const retryPolicy = new RetryPolicy(strategy, [errorDetectionStrategy]);

      return assert.isFulfilled(retryPolicy.handleRetryable(new Error()));
    });
  });

  describe('handleFatal', () => {
    it('should return a rejected promise', () => {
      const strategy = new LinearRetryStrategy(10, 1);
      const retryPolicy = new RetryPolicy(strategy);

      return assert.isRejected(retryPolicy.handleFatal(new Error()));
    });
  });

  describe('handleSuccess', () => {
    it('should reset the state', async () => {
      const strategy = new LinearRetryStrategy(10, 1);
      const retryPolicy = new RetryPolicy(strategy);

      await assert.isFulfilled(retryPolicy.handleError(new Error()));

      assert.equal(retryPolicy.getState().getRetryCount(), 1);

      retryPolicy.handleSuccess();

      assert.equal(retryPolicy.getState().getRetryCount(), 0);
    });
  });

  describe('makeRetryPromise', () => {
    it('should return a promise that resolve after 300 ms', async () => {
      const strategy = new LinearRetryStrategy(100, 1);
      const retryPolicy = new RetryPolicy(strategy);

      const startTime = Date.now();

      const promise = retryPolicy.makeRetryPromise(new RetryState(3));
      await assert.isFulfilled(promise);

      const endTime = Date.now();

      assert.isAtLeast(endTime, startTime + 100 * 3);
      assert.isAtMost(endTime, startTime + 100 * 3 + 10); // minor diff maybe
    });

    it('should return a promise that resolve after 600 ms', async () => {
      const strategy = new LinearRetryStrategy(50, 12);
      const retryPolicy = new RetryPolicy(strategy);

      const startTime = Date.now();

      const promise = retryPolicy.makeRetryPromise(new RetryState(12));
      await assert.isFulfilled(promise);

      const endTime = Date.now();

      assert.isAtLeast(endTime, startTime + 50 * 12);
      assert.isAtMost(endTime, startTime + 50 * 12 + 10); // minor diff maybe
    });
  });
});
