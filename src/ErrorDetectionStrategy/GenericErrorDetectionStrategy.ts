import { ErrorDetectionStrategy } from './ErrorDetectionStrategy';

export type ErrorClass = () => Error;

export class GenericErrorDetectionStrategy extends ErrorDetectionStrategy {
  constructor(protected readonly retryableErrors: ReadonlyArray<ErrorClass>) {
    super();
  }

  public isRetryable(error: Error): boolean {
    for (const retryableError of this.retryableErrors) {
      if (error.name !== retryableError.name) {
        continue;
      }

      return true;
    }

    return false;
  }
}
