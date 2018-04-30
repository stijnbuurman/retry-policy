/* istanbul ignore next */
export abstract class ErrorDetectionStrategy {
  public abstract isRetryable(error: Error): boolean;
}
