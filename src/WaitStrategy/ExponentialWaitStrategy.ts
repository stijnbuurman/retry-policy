import { WaitStrategy } from './WaitStrategy';

export const exponentialWaitStrategy: WaitStrategy = (
  {
    exponent,
    timeout
  }: {
    readonly timeout: number;
    readonly exponent: number;
  } = {
    exponent: 2,
    timeout: 100
  }
) => (retryCount: number) => timeout * exponent ** (retryCount - 1);
