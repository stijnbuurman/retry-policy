/* istanbul ignore next */
export abstract class FaultRecognizer {
  public abstract isRetryable(error: Error): boolean;
}
