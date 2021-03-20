import {assert} from 'chai';
import 'mocha';
import {fixedWaitStrategy} from '../../src/WaitStrategy';

describe('FixedWaitStrategy', () => {
    describe('with default timeout', () => {
        const getWaitTime = fixedWaitStrategy();

        it('should give a timeout of 100 on first try', () => {
            assert.equal(getWaitTime(1), 100);
        });

        it('should give a timeout of 100 on second try', () => {
            assert.equal(getWaitTime(2), 100);
        });

        it('should give a timeout of 100 on third try', () => {
            assert.equal(getWaitTime(3), 100);
        });

        it('should give a timeout of 100 on fourth try', () => {
            assert.equal(getWaitTime(4), 100);
        });
    });

    describe('With custom timout', () => {
        const getWaitTime = fixedWaitStrategy({timeout: 150});

        it('should give a timeout of 150 on first try', () => {
            assert.equal(getWaitTime(1), 150);
        });

        it('should give a timeout of 150 on second try', () => {
            assert.equal(getWaitTime(2), 150);
        });

        it('should give a timeout of 150 on third try', () => {
            assert.equal(getWaitTime(3), 150);
        });

        it('should give a timeout of 150 on fourth try', () => {
            assert.equal(getWaitTime(4), 150);
        });
    });
});
