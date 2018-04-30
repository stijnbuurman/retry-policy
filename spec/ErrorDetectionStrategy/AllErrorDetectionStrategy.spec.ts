import {assert} from 'chai';
import 'mocha';
import {AllErrorDetectionStrategy} from "../../src/ErrorDetectionStrategy/AllErrorDetectionStrategy";

describe('AllErrorDetectionStrategy', () => {

    it('should recognize any error', () => {
        const errorDetectionStrategy = new AllErrorDetectionStrategy();
        assert.isTrue(errorDetectionStrategy.isRetryable(new RangeError()));
        assert.isTrue(errorDetectionStrategy.isRetryable(new Error()));
        assert.isTrue(errorDetectionStrategy.isRetryable(new EvalError()));
    });
});