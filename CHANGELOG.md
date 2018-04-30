# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.3"></a>
## [1.0.3](https://github.com/stijnbuurman/retry-policy/compare/v1.0.2...v1.0.3) (2018-04-30)
- Added tests
- Added EvenRetryStrategy and ExponentialRetryStrategy
- Changed isRetryAllowed to sit in the abstract RetryStrategy
- Fixed RetryPolicy not checking ifRetryAllowed against current state


<a name="1.0.2"></a>
## [1.0.2](https://github.com/stijnbuurman/retry-policy/compare/v1.0.1...v1.0.2) (2018-04-30)
- Fixed .gitignore not ignoring .d.ts and .js files in src/ and spec/
- Fixed .prettierignore not ignoring .d.ts files in src/ and spec/


<a name="1.0.1"></a>
## 1.0.1 (2018-04-30)
Initial version. Missing examples and documentation.

Includes: RetryPolicy, RetryStrategy, LinearRetryStrategy, ErrorDetectionStrategy and GenericErrorDetectionStrategy.