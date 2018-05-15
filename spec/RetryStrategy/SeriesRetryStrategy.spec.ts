import { assert } from 'chai';
import 'mocha';
import { SeriesRetryStrategy } from '../../src/RetryStrategy';

describe('Series Retry Strategy', () => {
  const seriesRetryStrategy = new SeriesRetryStrategy([10, 20, 40, 65]);

  it('should give a timeout of 10 on first try', () => {
    assert.equal(seriesRetryStrategy.getTimeout(1), 10);
  });

  it('should give a timeout of 20 on second try', () => {
    assert.equal(seriesRetryStrategy.getTimeout(2), 20);
  });

  it('should give a timeout of 40 on third try', () => {
    assert.equal(seriesRetryStrategy.getTimeout(3), 40);
  });

  it('should give a timeout of 65 on fourth try', () => {
    assert.equal(seriesRetryStrategy.getTimeout(4), 65);
  });

  it('should be undefined on 5th attempt', () => {
    assert.equal(seriesRetryStrategy.getTimeout(5), undefined);
  });
});
