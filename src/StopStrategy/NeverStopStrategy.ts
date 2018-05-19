import { StopStrategy } from './StopStrategy';

export const neverStopStrategy: StopStrategy = () => {
  return () => false;
};
