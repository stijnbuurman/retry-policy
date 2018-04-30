import { assert } from 'chai';
import 'mocha';
import { NoErrorDetectionStrategy } from '../../src/ErrorDetectionStrategy';

describe('No Error Detection Strategy', () => {
  it('should recognize no error', () => {
    const errorDetectionStrategy = new NoErrorDetectionStrategy();
    assert.isFalse(errorDetectionStrategy.isRetryable(new RangeError()));
    assert.isFalse(errorDetectionStrategy.isRetryable(new Error()));
    assert.isFalse(errorDetectionStrategy.isRetryable(new EvalError()));
  });
});
