import { FaultRecognizer } from './FaultRecognizer';

export type ErrorClass = () => Error;

export class GenericFaultRecognizer extends FaultRecognizer {
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
