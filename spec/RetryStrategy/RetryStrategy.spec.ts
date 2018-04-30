import { assert } from 'chai';
import { RetryState } from '../../src';
import { MockedRetryStrategy } from './MockedRetryStrategy';

describe('Retry Strategy', () => {
  const mockedStrategy = new MockedRetryStrategy(50);

  it('should not be retryable when retries is equal or bigger than max retries', () => {
    assert.isFalse(mockedStrategy.isRetryAllowed(new RetryState(50)));
    assert.isFalse(mockedStrategy.isRetryAllowed(new RetryState(51)));
    assert.isFalse(
      mockedStrategy.isRetryAllowed(new RetryState(Number.MAX_VALUE))
    );
  });

  it('should be retryable when retries is lower than max retries', () => {
    assert.isTrue(mockedStrategy.isRetryAllowed(new RetryState(-1)));
    assert.isTrue(mockedStrategy.isRetryAllowed(new RetryState(0)));
    assert.isTrue(mockedStrategy.isRetryAllowed(new RetryState(4)));
  });
});
