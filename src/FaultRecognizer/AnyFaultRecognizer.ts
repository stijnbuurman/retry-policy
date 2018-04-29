import { FaultRecognizer } from './FaultRecognizer';

export class AnyFaultRecognizer extends FaultRecognizer {
  public isRetryable(error: Error): boolean {
    return true;
  }
}
