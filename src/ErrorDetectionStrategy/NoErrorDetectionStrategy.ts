import { ErrorDetectionStrategy } from './ErrorDetectionStrategy';

export const noErrorDetectionStrategy: ErrorDetectionStrategy = () => () =>
  false;
