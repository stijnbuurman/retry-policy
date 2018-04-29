import {LinearRetryStrategy} from "../../src/RetryStrategy/LinearRetryStrategy";
import {assert} from 'chai';
import 'mocha';
import {RetryState} from "../../src/RetryState/RetryState";

describe('Linear Retry Strategy', () => {

    it('should give a timeout of 1000', () => {
        const linearStrategy = new LinearRetryStrategy(1000);
        assert.equal(linearStrategy.getTimeout(1), 1000);
    });

    it('should give a timeout of 4000', () => {
        const linearStrategy = new LinearRetryStrategy(2000);
        assert.equal(linearStrategy.getTimeout(2),4000);
    });

    it('should give a timeout of 9000', () => {
        const linearStrategy = new LinearRetryStrategy(3000);
        assert.equal(linearStrategy.getTimeout(3), 9000);
    });

    it('should not be retryable when max retries is passed', () => {
        const linearStrategy = new LinearRetryStrategy(3000, 1);
        let isRetryAllowed = linearStrategy.isRetryAllowed(new RetryState(4));
        assert.isFalse(isRetryAllowed);
    });

    it('should be retryable when max retries is not passed', () => {
        const linearStrategy = new LinearRetryStrategy(3000, 5);
        let isRetryAllowed = linearStrategy.isRetryAllowed(new RetryState(4));
        assert.isTrue(isRetryAllowed);
    });

});