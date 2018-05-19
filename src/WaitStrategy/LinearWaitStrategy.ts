import { WaitStrategy } from './WaitStrategy';

export const linearWaitStrategy: WaitStrategy = (
  {
    slope,
    timeout
  }: {
    readonly timeout: number;
    readonly slope: number;
  } = {
    slope: 1,
    timeout: 100
  }
) => {
  return (retryCount: number) => timeout * retryCount * slope;
};
