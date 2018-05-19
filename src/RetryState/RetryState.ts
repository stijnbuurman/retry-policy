export class RetryState {
  constructor(private retryCount: number = 0, private lastError?: Error) {}

  public getRetryCount(): number {
    return this.retryCount;
  }

  public getLastError(): Error {
    return this.lastError;
  }

  public addOneRetry(error: Error): RetryState {
    return new RetryState(this.retryCount + 1, error);
  }
}
