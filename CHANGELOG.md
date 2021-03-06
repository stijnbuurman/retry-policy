# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [2.0.0](https://github.com/stijnbuurman/retry-policy/compare/v1.5.0...v2.0.0) (2021-03-20)

### Bug fixes
- Make 0 waiting time the default WaitingStrategy
- Lot of types has been fixed

### Dependencies
- Moved from tslint to eslint
- Removed nsp
- Updated all dependencies

### Breaking change
- RetryPolicy is now a class
    - this can be fixed by replacing `RetryPolicy()` with `new RetryPolicy()`

<a name="1.5.0"></a>
# [1.5.0](https://github.com/stijnbuurman/retry-policy/compare/1.4.3...1.5.0) (2018-05-23)


### Bug Fixes

* **defaults:** Make NeverStop the default StopStrategy ([585dbc0](https://github.com/stijnbuurman/retry-policy/commit/585dbc0))
* Add default to RetryPolicy options object. ([54c566f](https://github.com/stijnbuurman/retry-policy/commit/54c566f))
* Fix the way defaults in strategies are defined ([5f22681](https://github.com/stijnbuurman/retry-policy/commit/5f22681))


### Features

* Add RetryPolicy.execute to make it easier to use ([25fdff8](https://github.com/stijnbuurman/retry-policy/commit/25fdff8))



<a name="1.4.3"></a>
## [1.4.3](https://github.com/stijnbuurman/retry-policy/compare/v1.2.0...v1.4.3) (2018-05-20)


### Features

* **paradigm:** Complete rewrite to make everything functional ([cf30e25](https://github.com/stijnbuurman/retry-policy/commit/cf30e25))
* **retryStrategies:** Add lastError to getTimeout to allow timeout based on error (useful for Retry-After header) ([66e016b](https://github.com/stijnbuurman/retry-policy/commit/66e016b))

### Build
* **CircleCI** Make the build not fail on test coverage under 100%

### Breaking Changes
* Uses functions instead of classes
* RetryStrategy is split into StopStrategy and WaitStrategy
* EvenRetryStrategy is now named FixedWaitStrategy


<a name="1.2.0"></a>
# [1.2.0](https://github.com/stijnbuurman/retry-policy/compare/1.1.0...1.2.0) (2018-05-15)


### Features

* **paradigm:** Rewrite retry policy to be stateless and more functional ([d706481](https://github.com/stijnbuurman/retry-policy/commit/d706481))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/stijnbuurman/retry-policy/compare/v1.0.2...v1.1.0) (2018-05-03)


### Features

* **retryStrategies:** Add SeriesRetryStrategy. ([1d89c62](https://github.com/stijnbuurman/retry-policy/commit/1d89c62))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/stijnbuurman/retry-policy/compare/v1.0.2...v1.0.4) (2018-05-02)
### Bug fixes
- add spec, .circleci and .idea to .npmignore

### Added
- npm package (@stinoz/retry-policy)


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