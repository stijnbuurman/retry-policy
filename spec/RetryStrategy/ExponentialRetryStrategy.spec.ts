import { assert } from 'chai';
import 'mocha';
import { ExponentialRetryStrategy } from '../../src/RetryStrategy';

describe('Exponential Retry Strategy', () => {
  const exponentialStrategy = new ExponentialRetryStrategy(100, 5);

  it('should give a timeout of 100 on first try', () => {
    assert.equal(exponentialStrategy.getTimeout(1), 100);
  });

  it('should give a timeout of 200 on second try', () => {
    assert.equal(exponentialStrategy.getTimeout(2), 200);
  });

  it('should give a timeout of 400 on third try', () => {
    assert.equal(exponentialStrategy.getTimeout(3), 400);
  });

  it('should give a timeout of 800 on fourth try', () => {
    assert.equal(exponentialStrategy.getTimeout(4), 800);
  });
});
