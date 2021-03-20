import {assert} from 'chai';
import 'mocha';
import {allErrorDetectionStrategy} from '../../src/ErrorDetectionStrategy/AllErrorDetectionStrategy';

describe('AllErrorDetectionStrategy', () => {
    it('should recognize any error', () => {
        const isRetryable = allErrorDetectionStrategy();
        assert.isTrue(isRetryable(new RangeError()));
        assert.isTrue(isRetryable(new Error()));
        assert.isTrue(isRetryable(new EvalError()));
    });
});
