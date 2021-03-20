import type {ErrorDetectionStrategyBuilder} from './ErrorDetectionStrategyBuilder';

export const noErrorDetectionStrategy: ErrorDetectionStrategyBuilder = () => () =>
    false;
