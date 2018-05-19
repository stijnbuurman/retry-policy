import { WaitStrategy } from './WaitStrategy';

export const seriesWaitStrategy: WaitStrategy = (
  { delays }: { readonly delays: ReadonlyArray<number> } = { delays: [] }
) => {
  return (retryCount: number) =>
    retryCount - 1 in delays ? delays[retryCount - 1] : undefined;
};
