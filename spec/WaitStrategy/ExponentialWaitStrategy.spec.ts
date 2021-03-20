import {assert} from 'chai';
import 'mocha';
import {exponentialWaitStrategy} from '../../src/WaitStrategy';

describe('Exponential Wait Strategy (settings)', () => {
    const getWaitTime = exponentialWaitStrategy({timeout: 200, exponent: 2});

    it('should give a timeout of 100 on first try', () => {
        assert.equal(getWaitTime(1), 200);
    });

    it('should give a timeout of 400 on second try', () => {
        assert.equal(getWaitTime(2), 400);
    });

    it('should give a timeout of 800 on third try', () => {
        assert.equal(getWaitTime(3), 800);
    });

    it('should give a timeout of 1600 on fourth try', () => {
        assert.equal(getWaitTime(4), 1600);
    });
});

describe('Exponential Wait Strategy (defaults)', () => {
    const getWaitTime = exponentialWaitStrategy();

    it('should give a timeout of 100 on first try', () => {
        assert.equal(getWaitTime(1), 100);
    });

    it('should give a timeout of 200 on second try', () => {
        assert.equal(getWaitTime(2), 200);
    });

    it('should give a timeout of 400 on third try', () => {
        assert.equal(getWaitTime(3), 400);
    });

    it('should give a timeout of 800 on fourth try', () => {
        assert.equal(getWaitTime(4), 800);
    });
});
