import {ErrorDetectionStrategy, RetryPolicy, StopStrategy, WaitStrategy} from '../../src';

import sinon from 'sinon';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';


chai.use(chaiAsPromised);
const assert = chai.assert;

describe('RetryPolicy', () => {
    const MOCK_RESULT = Symbol('MOCK_RESULT');
    const MOCK_ERROR = new Error('MOCK ERROR');

    let retryPolicy: RetryPolicy;
    let errorDetectionStrategy: sinon.SinonStub;
    let stopStrategy: sinon.SinonStub;
    let waitStrategy: sinon.SinonStub;

    beforeEach(() => {
        errorDetectionStrategy = sinon.stub();
        stopStrategy = sinon.stub();
        waitStrategy = sinon.stub().returns(0);

        retryPolicy = new RetryPolicy({
            errorDetectionStrategies: [
                errorDetectionStrategy as ErrorDetectionStrategy
            ],
            stopStrategy: stopStrategy as StopStrategy,
            waitStrategy: waitStrategy as WaitStrategy,
        });
    })

    it('Should return on successful execution', async () => {
        const action = sinon.stub().resolves(MOCK_RESULT);

        stopStrategy.returns(false);
        errorDetectionStrategy.returns(true);

        const result = await retryPolicy.execute(action);

        sinon.assert.calledOnce(action);
        assert.equal(result, MOCK_RESULT);
    });

    it('should reject on a non retryable error', () => {
        const action = sinon.stub().rejects(MOCK_ERROR);

        stopStrategy.returns(false);
        errorDetectionStrategy.returns(false);

        assert.isRejected(retryPolicy.execute(action));

        sinon.assert.calledOnce(action);
    });

    it('should retry on a retryable error', async () => {
        const action = sinon.stub()
            .onFirstCall().rejects(MOCK_ERROR)
            .onSecondCall().resolves(MOCK_RESULT);

        stopStrategy.returns(false);
        errorDetectionStrategy.returns(true);

        let executePromise = retryPolicy.execute(action);
        assert.isFulfilled(executePromise);

        assert.equal(await executePromise, MOCK_RESULT);

        sinon.assert.calledTwice(action);
    });

    it('should stop when stop limit is reached', async () => {
        const action = sinon.stub().rejects(MOCK_ERROR);

        stopStrategy
            .onFirstCall().returns(false)
            .onSecondCall().returns(true);

        errorDetectionStrategy.returns(true);

        let executePromise = retryPolicy.execute(action);
        let errorPromise = executePromise.catch((error) => error);
        assert.isRejected(executePromise);

        assert.equal(await errorPromise, MOCK_ERROR);

        sinon.assert.calledTwice(action);
    });

    it('should stop when an undefined wait time is received', async () => {
        const action = sinon.stub()
            .onFirstCall().rejects(MOCK_ERROR)
            .onSecondCall().resolves(MOCK_RESULT);

        stopStrategy.returns(false);
        errorDetectionStrategy.returns(true);
        waitStrategy.returns(undefined);

        assert.isRejected(retryPolicy.execute(action));
        sinon.assert.calledOnce(action);
    });

    it('should have defaults set', async () => {
        retryPolicy = new RetryPolicy();

        // never stop
        assert.equal(retryPolicy.stopStrategy(Infinity), false);
        // all errors
        assert.equal(retryPolicy.errorDetectionStrategies[0](MOCK_ERROR), true);
        // no wait
        assert.equal(retryPolicy.waitStrategy(Infinity), 0);
    });
});
