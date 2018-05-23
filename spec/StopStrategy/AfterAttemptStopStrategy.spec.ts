import { assert } from 'chai';
import 'mocha';
import { afterAttemptStopStrategy } from '../../src/StopStrategy/AfterAttemptStopStrategy';

describe('After Attempt Stop Strategy (3 attempts)', () => {
  const isStopped = afterAttemptStopStrategy({ attempts: 3 });

  it('should give false on first 3 tries (first 2 retries)', () => {
    assert.equal(isStopped(1), false);
    assert.equal(isStopped(2), false);
  });

  it('should give true on 4th try', () => {
    assert.equal(isStopped(3), true);
  });

  it('should give true on MAX_VALUE try', () => {
    assert.equal(isStopped(Number.MAX_VALUE), true);
  });
});

describe('After Attempt Stop Strategy default', () => {
  const isStopped = afterAttemptStopStrategy();

  it('should give false on first 5 tries', () => {
    assert.equal(isStopped(1), false);
    assert.equal(isStopped(2), false);
    assert.equal(isStopped(3), false);
    assert.equal(isStopped(4), false);
  });

  it('should give true on 4th try', () => {
    assert.equal(isStopped(5), true);
  });

  it('should give true on MAX_VALUE try', () => {
    assert.equal(isStopped(Number.MAX_VALUE), true);
  });
});
