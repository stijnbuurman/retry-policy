import type {StopStrategyBuilder} from './StopStrategyBuilder';

export const neverStopStrategy: StopStrategyBuilder = () => {
    return () => false;
};
