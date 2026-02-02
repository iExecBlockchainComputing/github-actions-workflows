# Changelog

## [3.0.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v2.4.0...docker-build-v3.0.0) (2026-02-02)


### ⚠ BREAKING CHANGES

* enforce an optimize single platform docker-build with failure on CRITICAL or HIGH fixed vulnerabilities detection ([#98](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/98))

### Code Refactoring

* enforce an optimize single platform docker-build with failure on CRITICAL or HIGH fixed vulnerabilities detection ([#98](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/98)) ([59d6ea2](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/59d6ea284b1a9f75c8e2e7bb3f92ec900edc44f1))

## [2.4.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v2.3.1...docker-build-v2.4.0) (2025-07-30)


### Features

* variabilize docker build platforms ([#81](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/81)) ([1d02b7e](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/1d02b7ee6d75c7d88046ebf3dd51b969c2a651ae))

## [2.3.1](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v2.3.0...docker-build-v2.3.1) (2025-07-03)


### Bug Fixes

* **docker-build:** skip hadolint comment outside of PR context ([#75](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/75)) ([4ac41dd](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/4ac41dd0e87a61710ebc19303bc15ada656d9a12))

## [2.3.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v2.2.0...docker-build-v2.3.0) (2025-07-02)


### Features

* **docker-build:** allow dry-runs by always running build (even if push is disabled) ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** features and fixes ([#72](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/72)) ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** make image-tag and dockerfile optional ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))


### Bug Fixes

* **docker-build:** fix sarif security-report ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))

## [2.2.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v2.1.0...docker-build-v2.2.0) (2025-04-29)


### Features

* **docker-build:** enhance reporting ([#39](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/39)) ([298ec52](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/298ec521fe7ea48c81258dc259014b9182fa4cc3))

## [2.1.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v2.0.0...docker-build-v2.1.0) (2025-04-24)


### Features

* **docker-build:** add security report option and upload step ([#37](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/37)) ([5d6d470](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/5d6d470b30eb5be75ebb0c78b3477511bb9fa272))

## [2.0.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v1.2.0...docker-build-v2.0.0) (2025-03-21)


### ⚠ BREAKING CHANGES

* **docker-build:** make it more reusable ([#17](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/17))

### Bug Fixes

* **docker-build:** make it more reusable ([#17](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/17)) ([e11b377](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/e11b377b8ed53820151de5687ecac0b09c251810))

## [1.2.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v1.1.1...docker-build-v1.2.0) (2025-03-05)


### Features

* **docker-build:** add some vars ([#14](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/14)) ([b56bba2](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/b56bba2f4ae61f67bcb2a442a119855cdb4a133d))

## [1.1.1](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v1.1.0...docker-build-v1.1.1) (2025-03-05)


### Bug Fixes

* tag of aquasecurity ([#8](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/8)) ([1d3ff47](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/1d3ff475697b55b43dd42eb600d41cd42d8d0d37))

## [1.1.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v1.0.2...docker-build-v1.1.0) (2025-03-05)


### Features

* add security scan ([#6](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/6)) ([4f91f55](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/4f91f5525d8c7986d9aa1b1273ec229da39a7dec))

## [1.0.2](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v1.0.1...docker-build-v1.0.2) (2025-03-05)


### Bug Fixes

* **docker-build:** secrets inputs ([#4](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/4)) ([41411e9](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/41411e9b11230d6afad0fc8b2cf60b99154448d9))

## [1.0.1](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/docker-build-v1.0.0...docker-build-v1.0.1) (2025-03-05)


### Bug Fixes

* **docker-build:** secrets ([#2](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/2)) ([7368a4e](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/7368a4e617903a09e0b426d50d8b99abb7107bf9))

## 1.0.0 (2025-03-05)


### Features

* change ci and path trigger ([44db125](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/44db1257a68422bcec273a80f75173012cb30f56))
