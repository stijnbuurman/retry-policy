import { ErrorDetectionStrategy } from './ErrorDetectionStrategy';

export class NoErrorDetectionStrategy extends ErrorDetectionStrategy {
  public isRetryable(error: Error): boolean {
    return false;
  }
}
