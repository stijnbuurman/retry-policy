import { ErrorDetectionStrategy } from './ErrorDetectionStrategy';

export class AllErrorDetectionStrategy extends ErrorDetectionStrategy {
  public isRetryable(error: Error): boolean {
    return true;
  }
}
