import {assert} from 'chai';
import 'mocha';
import {neverStopStrategy, StopStrategy} from '../../src/StopStrategy';

describe('Never Stop Strategy', () => {
    const strategy: StopStrategy = neverStopStrategy();

    it('should give false on 1st try', () => {
        assert.equal(strategy(1), false);
    });

    it('should give false on MAX_VALUE', () => {
        assert.equal(strategy(Number.MAX_VALUE), false);
    });
});
