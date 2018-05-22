import { WaitStrategy } from './WaitStrategy';

export const exponentialWaitStrategy: WaitStrategy = ({
  exponent = 2,
  timeout = 100
}: {
  readonly timeout?: number;
  readonly exponent?: number;
} = {}) => (retryCount: number) => timeout * exponent ** (retryCount - 1);
