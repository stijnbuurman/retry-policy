import type {WaitStrategyBuilder} from './WaitStrategyBuilder';

export const exponentialWaitStrategy: WaitStrategyBuilder =
    ({
         exponent = 2,
         timeout = 100,
     }: {
        readonly timeout?: number;
        readonly exponent?: number;
    } = {}) => (retryCount: number) => timeout * exponent ** (retryCount - 1);
