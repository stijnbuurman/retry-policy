import type { ErrorDetectionStrategy } from './ErrorDetectionStrategyBuilder';

export type ErrorClass = () => Error;

export const genericErrorDetectionStrategy = ({
  errors = [],
}: {
  readonly errors?: ReadonlyArray<ErrorClass>;
} = {}): ErrorDetectionStrategy => {
  return (error: Error) => {
    return errors.some((errorClass) => error.name === errorClass.name);
  };
};
