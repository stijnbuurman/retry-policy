import {assert} from 'chai';
import 'mocha';
import {GenericFaultRecognizer} from "../../src/FaultRecognizer/GenericFaultRecognizer";

describe('Generic Fault Recognizer', () => {

    it('should recognize an error if set', () => {
        const faultRecognizer = new GenericFaultRecognizer([
            RangeError
        ]);

        assert.isTrue(faultRecognizer.isRetryable(new RangeError()));
    });

    it('should not recognize an error if not set', () => {
        const faultRecognizer = new GenericFaultRecognizer([
            RangeError
        ]);

        assert.isFalse(faultRecognizer.isRetryable(new EvalError()));
    });
});