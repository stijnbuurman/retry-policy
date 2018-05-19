import {StopStrategy} from "./StopStrategy";

export const stopNeverStrategy: StopStrategy = () => {
  return () => false;
};
