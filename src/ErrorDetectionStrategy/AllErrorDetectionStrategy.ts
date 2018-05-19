import { ErrorDetectionStrategy } from './ErrorDetectionStrategy';

export const allErrorDetectionStrategy: ErrorDetectionStrategy = () => {
  return () => true;
};
