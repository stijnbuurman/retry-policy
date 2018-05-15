import { ErrorDetectionStrategy } from './ErrorDetectionStrategy';

export type ErrorClass = () => Error;

export class GenericErrorDetectionStrategy extends ErrorDetectionStrategy {
  constructor(protected readonly retryableErrors: ReadonlyArray<ErrorClass>) {
    super();
  }

  public isRetryable(error: Error): boolean {
    return !!this.retryableErrors.find(errorClass => {
      return error.name === errorClass.name;
    });
  }
}
