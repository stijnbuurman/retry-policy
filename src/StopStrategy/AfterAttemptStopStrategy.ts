import { StopStrategy } from './StopStrategy';

export const afterAttemptStopStrategy: StopStrategy = ({
  attempts = 5
}: { readonly attempts?: number } = {}) => {
  return (retryCount: number) => retryCount >= attempts;
};
