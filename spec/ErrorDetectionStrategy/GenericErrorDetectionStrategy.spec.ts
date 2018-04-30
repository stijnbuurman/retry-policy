import { assert } from 'chai';
import 'mocha';
import { GenericErrorDetectionStrategy } from '../../src/ErrorDetectionStrategy';

describe('Generic Error Detection Strategy', () => {
  it('should recognize an error if set', () => {
    const errorDetectionStrategy = new GenericErrorDetectionStrategy([
      RangeError
    ]);

    assert.isTrue(errorDetectionStrategy.isRetryable(new RangeError()));
  });

  it('should not recognize an error if not set', () => {
    const errorDetectionStrategy = new GenericErrorDetectionStrategy([
      RangeError
    ]);

    assert.isFalse(errorDetectionStrategy.isRetryable(new EvalError()));
  });
});
