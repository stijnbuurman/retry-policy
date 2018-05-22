import { WaitStrategy } from './WaitStrategy';

export const linearWaitStrategy: WaitStrategy = ({
  slope = 1,
  timeout = 100
}: {
  readonly timeout?: number;
  readonly slope?: number;
} = {}) => {
  return (retryCount: number) => timeout * retryCount * slope;
};
