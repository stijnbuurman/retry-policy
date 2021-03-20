import type {WaitStrategyBuilder} from './WaitStrategyBuilder';

export const seriesWaitStrategy: WaitStrategyBuilder =
    ({delays = []}: { delays?: ReadonlyArray<number> } = {}) => {
        return (retryCount: number) => {
            return retryCount - 1 in delays ? delays[retryCount - 1] : undefined;
        }
    };
