import { assert } from 'chai';
import 'mocha';
import { LinearRetryStrategy } from '../../src/RetryStrategy';

describe('Linear Retry Strategy', () => {
  const linearStrategy = new LinearRetryStrategy(1000, 35);

  it('should give a timeout of 1000 on first try', () => {
    assert.equal(linearStrategy.getTimeout(1), 1000);
  });

  it('should give a timeout of 2000 on second try', () => {
    assert.equal(linearStrategy.getTimeout(2), 2000);
  });

  it('should give a timeout of 30000 on thirtieth try', () => {
    assert.equal(linearStrategy.getTimeout(30), 30000);
  });
});
