import { assert } from 'chai';
import 'mocha';
import { linearWaitStrategy } from '../../src/WaitStrategy';

describe('Linear Wait Strategy', () => {
  const linearStrategy = linearWaitStrategy({ timeout: 200, slope: 1 });

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
