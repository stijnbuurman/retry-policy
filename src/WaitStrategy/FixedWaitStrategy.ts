import { WaitStrategy } from './WaitStrategy';

export const fixedWaitStrategy: WaitStrategy = ({
  timeout = 100
}: { readonly timeout?: number } = {}) => {
  return () => timeout;
};
