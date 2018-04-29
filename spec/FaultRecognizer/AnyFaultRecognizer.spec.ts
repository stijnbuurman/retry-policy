import {assert} from 'chai';
import 'mocha';
import {AnyFaultRecognizer} from "../../src/FaultRecognizer/AnyFaultRecognizer";

describe('Any Fault Recognizer', () => {

    it('should recognize any error', () => {
        const faultRecognizer = new AnyFaultRecognizer();
        assert.isTrue(faultRecognizer.isRetryable(new RangeError()));
        assert.isTrue(faultRecognizer.isRetryable(new Error()));
        assert.isTrue(faultRecognizer.isRetryable(new EvalError()));
    });
});