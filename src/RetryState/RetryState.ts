export class RetryState {
  constructor(
    private readonly retryCount: number = 0,
    private readonly lastError?: Error
  ) {}

  public getRetryCount(): number {
    return this.retryCount;
  }

  public getLastError(): Error | undefined {
    return this.lastError;
  }

  public addOneRetry(error: Error): RetryState {
    return new RetryState(this.retryCount + 1, error);
  }
}
