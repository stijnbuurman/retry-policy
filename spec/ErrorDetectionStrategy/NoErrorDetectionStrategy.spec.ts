import {assert} from 'chai';
import 'mocha';
import {noErrorDetectionStrategy} from '../../src/ErrorDetectionStrategy';

describe('No Error Detection Strategy', () => {
    it('should recognize no error', () => {
        const isRetryable = noErrorDetectionStrategy();
        assert.isFalse(isRetryable(new RangeError()));
        assert.isFalse(isRetryable(new Error()));
        assert.isFalse(isRetryable(new EvalError()));
    });
});
