import { assert } from 'chai';
import 'mocha';
import { seriesWaitStrategy } from '../../src/WaitStrategy';

describe('Series Retry Strategy', () => {
  const getWaitTime = seriesWaitStrategy({ delays: [10, 20, 40, 65] });

  it('should give a timeout of 10 on first try', () => {
    assert.equal(getWaitTime(1), 10);
  });

  it('should give a timeout of 20 on second try', () => {
    assert.equal(getWaitTime(2), 20);
  });

  it('should give a timeout of 40 on third try', () => {
    assert.equal(getWaitTime(3), 40);
  });

  it('should give a timeout of 65 on fourth try', () => {
    assert.equal(getWaitTime(4), 65);
  });

  it('should be undefined on 5th attempt', () => {
    assert.equal(getWaitTime(5), undefined);
  });
});
