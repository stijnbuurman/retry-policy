import type { WaitStrategyBuilder } from './WaitStrategyBuilder';

export const fixedWaitStrategy: WaitStrategyBuilder = ({
  timeout = 100,
}: { readonly timeout?: number } = {}) => {
  return () => timeout;
};
