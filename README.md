[![CircleCI](https://circleci.com/gh/stijnbuurman/retry-policy/tree/master.svg?style=svg)](https://circleci.com/gh/stijnbuurman/retry-policy/tree/master)
[![codecov](https://codecov.io/gh/stijnbuurman/retry-policy/branch/master/graph/badge.svg)](https://codecov.io/gh/stijnbuurman/retry-policy)

# retry-policy

This library tries to help with making applications tolerant for temporary errors.

## Features
- Use waitStrategies to specify timeouts between retries
- Use stopStrategies to specify number of attempts
- Use errorDetectionStrategies to recognize retryable errors
- Easily make your own strategies
- Written in Typescript
- Has an interceptor for Axios! ([axios-retry-policy](https://github.com/stijnbuurman/axios-retry-policy))

## How to install
```
npm install @stinoz/retry-policy
```

## Example
```javascript
// import RetryPolicy and strategies 
const {
    afterAttemptStopStrategy,
    exponentialWaitStrategy,
    RetryPolicy} = require('@stinoz/retry-policy');
  
// Build the retry policy  
const retryPolicy = RetryPolicy({
    stopStrategy: afterAttemptStopStrategy({attempts: 5}),
    waitStrategy: exponentialWaitStrategy({timeout: 500}),
});
  
// execute the unreliable action
retryPolicy.execute(() => {
    return unreliableAction();
});

```

## API

### RetryPolicy
The retry policy is responsible for executing retryable actions. Currently it only supports promise based actions (which should be easy to work around)

#### Make a new RetryPolicy
All parameters can be ommited.
 
These are the defaults:
```javascript
const retryPolicy = RetryPolicy({
    stopStrategy: neverStopStrategy(),
    waitStrategy: linearWaitStrategy({timeout: 100, slope: 100}),
    errorDetectionStrategies = [allErrorDetectionStrategy()],
});
```

#### Execute an action
Make sure to return the promise. 
All data of this promise will be passed in case it succeeds. 
In case it fails the last error will be passed unmodified. 
```javascript
// execute the unreliable action
retryPolicy.execute(() => {
    return unreliableAction();
})
.then((response) => {
    // this part is reached when:
    // - the action was successfull
    // - the action first was unsuccessfull but after x retries was
      
    console.log('success', response);
})
.catch((lastError) => {
    // This part is reached when:
    // - the action failed with a non retryable error
    // - the action was retried but the max attempts was reached
      
    console.error('failed', lastError);
});
```



### WaitStrategy

#### Fixed  (default)
This strategy keeps it simple and always uses the same timout.
```javascript
const retryPolicy = RetryPolicy({
    waitStrategy: fixedWaitStrategy({
        timeout: 100
    }),
});
```

#### Linear 
This strategy increases its timeout steady: e.g. 200, 400, 600
```javascript
const retryPolicy = RetryPolicy({
    waitStrategy: linearWaitStrategy({
        timeout: 100, 
        slope: 1
    }),
});
```

#### Exponential 
This strategy increases its timeout exponentially: e.g. 200, 400, 800
```javascript
const retryPolicy = RetryPolicy({
    waitStrategy: exponentialWaitStrategy({
        timeout: 100, 
        exponent: 2
    }),
});
```


#### Series


Pass an array with timeouts which will be used in order.

```javascript
const retryPolicy = RetryPolicy({
    waitStrategy: seriesWaitStrategy({
        delays: [100, 200, 600, 3000],
    }),
});
```


#### Make your own

In case you need to base your retry time on Retry-After headers, you can use the lastError.

```javascript
const retryPolicy = RetryPolicy({
    waitStrategy: (retryCount, lastError) => retryCount * 100 + Math.PI
});
```

### StopStrategy
It is always advisable to not try infinitely. Using a stop strategy you can set when to stop.

#### NeverStopStrategy (default)
This strategy will never stop until it succeeds.
```javascript
const retryPolicy = RetryPolicy({
    stopStrategy: neverStopStrategy(),
});
```

#### AfterAttemptStopStrategy 
When the number of attempts is reached it will stop.
```javascript
const retryPolicy = RetryPolicy({
    stopStrategy: afterAttemptStopStrategy({
        attempt: 10,
    }),
});
```

#### Make your own
```javascript
const retryPolicy = RetryPolicy({
    stopStrategy: (retryCount) => retryCount > 5 || retryCount + previousRetryCounts > 100,
});
```

### ErrorDetectionStrategy


One or more ErrorDetectionStrategies can be set to filter errors.


#### AllErrorDetectionStrategy (default)
Simple sees all errors as retryable. As this is the default strategy it can be ommitted.
```javascript
const retryPolicy = RetryPolicy({
    errorDetectionStrategies: [
        allErrorDetectionStrategy(
    )],
});
```


#### GenericErrorDetectionStrategy
This strategy can be used to detect errors by class name.
```javascript
const retryPolicy = RetryPolicy({
    errorDetectionStrategies: [
        genericErrorDetectionStrategy({
            errors: [RangeError],
        }
    )],
});
```


#### Make your own
```javascript
const retryPolicy = RetryPolicy({
    errorDetectionStrategies: [
        (error) => error.message === 'My Retryable Error'
    ],
});
```

### Custom strategy with parameters
When you want to make your own strategy that accepts parameters you can use this method:
```javascript
const myWaitStrategy = (paramA) {
    return (retryCount) {
        return 500 * retryCount + paramA;
    }
}
  
const retryPolicy = RetryPolicy({
    waitStrategy: myWaitStrategy(5000),
});
```


