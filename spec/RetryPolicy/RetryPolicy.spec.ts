import { RetryPolicy, RetryState } from '../../src';
import { noErrorDetectionStrategy } from '../../src/ErrorDetectionStrategy';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { afterAttemptStopStrategy } from '../../src/StopStrategy';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('RetryPolicy', () => {
  describe('Retryable errors', () => {
    const retryPolicy = RetryPolicy({});

    it('should resolve on a retryable error', () => {
      return assert.isFulfilled(retryPolicy(new Error()));
    });

    it('should return the correct retryState', () => {
      return retryPolicy(new Error()).then((retryState: RetryState) => {
        assert.equal(retryState.getRetryCount(), 1);
        assert.equal(retryState.getLastError().name, 'Error');
      });
    });
  });

  describe('Must respect stop strategy', () => {
    const retryPolicy = RetryPolicy({
      stopStrategy: afterAttemptStopStrategy({ attempts: 3 })
    });

    it('should resolve on first 3 retryable errors and fail after', async () => {
      const retryStatePromise = retryPolicy(new Error());
      assert.isFulfilled(retryStatePromise);

      retryStatePromise
        .then((retryState: RetryState) => {
          const retryStatePromise2 = retryPolicy(new Error(), retryState);
          assert.isFulfilled(retryStatePromise2);
          return retryStatePromise2;
        })
        .then((retryState: RetryState) => {
          const retryStatePromise3 = retryPolicy(new Error(), retryState);
          assert.isFulfilled(retryStatePromise3);
          return retryStatePromise3;
        })
        .then((retryState: RetryState) => {
          const retryStatePromise4 = retryPolicy(new Error(), retryState);
          assert.isRejected(retryStatePromise4);
        });
    });
  });

  describe('Non retryable errors', () => {
    it('should reject on a fatal error', () => {
      const retryPolicy = RetryPolicy({
        errorDetectionStrategies: [noErrorDetectionStrategy()],
        stopStrategy: afterAttemptStopStrategy({ attempts: 5 })
      });

      assert.isRejected(retryPolicy(new RangeError()));
    });
  });
});
