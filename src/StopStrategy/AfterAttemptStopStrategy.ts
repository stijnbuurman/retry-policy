import {StopStrategy} from "./StopStrategy";

export const stopAfterAttemptStrategy: StopStrategy = (
  { attempts = 5 }: { readonly attempts?: number } = {}
) => {
  return (retryCount: number) => retryCount >= attempts;
};
