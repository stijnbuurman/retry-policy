import { assert } from 'chai';
import 'mocha';
import { genericErrorDetectionStrategy } from '../../src/ErrorDetectionStrategy';

describe('Generic Error Detection Strategy', () => {
  it('should recognize an error if set', () => {
    const isRetryable = genericErrorDetectionStrategy({
      errors: [RangeError]
    });

    assert.isTrue(isRetryable(new RangeError()));
  });

  it('should not recognize an error if not set', () => {
    const isRetryable = genericErrorDetectionStrategy({
      errors: [RangeError]
    });

    assert.isFalse(isRetryable(new EvalError()));
  });
});
