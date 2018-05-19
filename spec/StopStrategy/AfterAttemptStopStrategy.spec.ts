import { assert } from 'chai';
import 'mocha';
import { afterAttemptStopStrategy } from '../../src/StopStrategy/AfterAttemptStopStrategy';

describe('After Attempt Stop Strategy', () => {
  const isStopped = afterAttemptStopStrategy(3);

  it('should give false on first 3 tries', () => {
    assert.equal(isStopped(1), false);
    assert.equal(isStopped(1), false);
    assert.equal(isStopped(1), false);
  });

  it('should give false on 4th try', () => {
    assert.equal(isStopped(Number.MAX_VALUE), true);
  });

  it('should give false on MAX_VALUE try', () => {
    assert.equal(isStopped(Number.MAX_VALUE), true);
  });
});
