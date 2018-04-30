import { assert } from 'chai';
import 'mocha';
import { EvenRetryStrategy } from '../../src/RetryStrategy';

describe('Even Retry Strategy', () => {
  const evenRetryStrategy = new EvenRetryStrategy(100);

  it('should give a timeout of 100 on first try', () => {
    assert.equal(evenRetryStrategy.getTimeout(1), 100);
  });

  it('should give a timeout of 100 on second try', () => {
    assert.equal(evenRetryStrategy.getTimeout(2), 100);
  });

  it('should give a timeout of 100 on third try', () => {
    assert.equal(evenRetryStrategy.getTimeout(3), 100);
  });

  it('should give a timeout of 100 on fourth try', () => {
    assert.equal(evenRetryStrategy.getTimeout(4), 100);
  });
});
