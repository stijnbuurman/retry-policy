import { assert } from 'chai';
import 'mocha';
import { RetryState } from '../../src';

describe('Retry State', () => {
  it('should set retryCount to 0 if no parameter is passed in constructor', () => {
    const retryState = new RetryState();
    assert.equal(retryState.getRetryCount(), 0);
  });

  describe('addOneRetry', () => {
    it('should return a new object retryState with one more retry', () => {
      const retryState = new RetryState();
      assert.equal(retryState.getRetryCount(), 0);

      const newRetryState = retryState.addOneRetry(new RangeError());
      assert.equal(newRetryState.getRetryCount(), 1);
      assert.equal(newRetryState.getLastError().name, 'RangeError');
    });

    it('should be immutable', () => {
      const retryState = new RetryState();
      assert.equal(retryState.getRetryCount(), 0);

      const newRetryState = retryState.addOneRetry(new Error());
      assert.equal(retryState.getRetryCount(), 0);
      assert.equal(retryState.getLastError(), undefined);
      assert.equal(newRetryState.getRetryCount(), 1);
      assert.equal(newRetryState.getLastError().name, 'Error');
    });
  });
});
