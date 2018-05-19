import { assert } from 'chai';
import 'mocha';
import {stopNeverStrategy} from "../../src/StopStrategy";

describe('Never Stop Strategy', () => {
  const isStopped = stopNeverStrategy();

  it('should give false on 1st try', () => {
    assert.equal(isStopped(1), false);
  });

  it('should give false on MAX_VALUE', () => {
    assert.equal(isStopped(Number.MAX_VALUE), false);
  });

});
