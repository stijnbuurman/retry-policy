import type {WaitStrategyBuilder} from './WaitStrategyBuilder';

export const linearWaitStrategy: WaitStrategyBuilder =
    ({
         slope = 1,
         timeout = 100,
     }: {
        readonly timeout?: number;
        readonly slope?: number;
    } = {}) => {
        return (retryCount: number) => timeout * retryCount * slope;
    };
