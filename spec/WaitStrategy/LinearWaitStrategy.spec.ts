import {assert} from 'chai';
import 'mocha';
import {linearWaitStrategy} from '../../src/WaitStrategy';

describe('Linear Wait Strategy', () => {
    describe('Custom', () => {
        const linearStrategy = linearWaitStrategy({timeout: 200, slope: 1});

        it('should give a timeout of 200 on first try', () => {
            assert.equal(linearStrategy(1), 200);
        });

        it('should give a timeout of 400 on second try', () => {
            assert.equal(linearStrategy(2), 400);
        });

        it('should give a timeout of 6000 on thirtieth try', () => {
            assert.equal(linearStrategy(30), 6000);
        });
    });

    describe('default', () => {
        const strategy = linearWaitStrategy();
        it('Should give a result based on slope 1 and timeout 100', () => {
            assert.equal(strategy(10), 1000);
            assert.equal(strategy(20), 2000);
        });
    })

});
