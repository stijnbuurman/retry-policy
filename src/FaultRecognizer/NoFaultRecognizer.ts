import { FaultRecognizer } from './FaultRecognizer';

export class NoFaultRecognizer extends FaultRecognizer {
  public isRetryable(error: Error): boolean {
    return false;
  }
}
