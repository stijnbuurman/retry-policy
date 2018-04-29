export class RetryState {
  constructor(private retryCount: number = 0) {}

  public getRetryCount(): number {
    return this.retryCount;
  }

  public addOneRetry(): RetryState {
    return new RetryState(this.retryCount + 1);
  }
}
