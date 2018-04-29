import {assert} from 'chai';
import 'mocha';
import {NoFaultRecognizer} from "../../src/FaultRecognizer/NoFaultRecognizer";

describe('No Fault Recognizer', () => {

    it('should recognize no error', () => {
        const faultRecognizer = new NoFaultRecognizer();
        assert.isFalse(faultRecognizer.isRetryable(new RangeError()));
        assert.isFalse(faultRecognizer.isRetryable(new Error()));
        assert.isFalse(faultRecognizer.isRetryable(new EvalError()));
    });
});