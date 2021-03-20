import type { StopStrategyBuilder } from './StopStrategyBuilder';

export const afterAttemptStopStrategy: StopStrategyBuilder = ({
  attempts = 5,
}: { readonly attempts?: number } = {}) => {
  return (retryCount: number) => retryCount >= attempts;
};
