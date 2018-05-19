import {WaitStrategy} from "./WaitStrategy";

export const waitExponentialStrategy: WaitStrategy = (options: {readonly timeout: number, readonly exponent: number} = {timeout: 100, exponent: 2}) => {
  return (retryCount: number) => options.timeout * options.exponent ** (retryCount - 1);
};