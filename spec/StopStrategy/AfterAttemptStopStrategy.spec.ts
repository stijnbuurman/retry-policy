import {assert} from 'chai';
import 'mocha';
import {afterAttemptStopStrategy} from "../../src";

describe('After Attempt Stop Strategy (3 attempts)', () => {
    const strategy = afterAttemptStopStrategy({attempts: 3});

    it('should give false on first 3 tries (first 2 retries)', () => {
        assert.equal(strategy(1), false);
        assert.equal(strategy(2), false);
    });

    it('should give true on 4th try', () => {
        assert.equal(strategy(3), true);
    });

    it('should give true on MAX_VALUE try', () => {
        assert.equal(strategy(Number.MAX_VALUE), true);
    });
});

describe('After Attempt Stop Strategy default', () => {
    const strategy = afterAttemptStopStrategy();

    it('should give false on first 5 tries', () => {
        assert.equal(strategy(1), false);
        assert.equal(strategy(2), false);
        assert.equal(strategy(3), false);
        assert.equal(strategy(4), false);
    });

    it('should give true on 6th try', () => {
        assert.equal(strategy(5), true);
    });

    it('should give true on MAX_VALUE try', () => {
        assert.equal(strategy(Number.MAX_VALUE), true);
    });
});
