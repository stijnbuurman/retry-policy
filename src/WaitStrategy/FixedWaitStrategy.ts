import { WaitStrategy } from './WaitStrategy';

export const fixedWaitStrategy: WaitStrategy = (
  { timeout }: { readonly timeout: number } = { timeout: 100 }
) => {
  return () => timeout;
};
