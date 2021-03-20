import type { ErrorDetectionStrategyBuilder } from './ErrorDetectionStrategyBuilder';

export const allErrorDetectionStrategy: ErrorDetectionStrategyBuilder = () => {
  return () => true;
};
