import {WaitStrategy} from "./WaitStrategy";

export const fixedWaitStrategy: WaitStrategy = (options: {readonly timeout: number}) => {
  return () => 'timeout' in options ? options.timeout : 0;
};