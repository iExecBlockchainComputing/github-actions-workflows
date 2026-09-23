# Changelog

## [4.0.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/v3.5.2...v4.0.0) (2026-09-23)


### ⚠ BREAKING CHANGES

* enforce an optimize single platform docker-build with failure on CRITICAL or HIGH fixed vulnerabilities detection ([#98](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/98))

### Features

* add docker login on dockerhub registry to use iExec rate limits ([#113](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/113)) ([aef28d1](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/aef28d1ce43734d0c6cbf8bd5fe21252195b15e4))
* add slsa attest to docker builds ([#126](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/126)) ([2fd65e3](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/2fd65e36f7e8dc548f8619e1cc290a2171e32210))
* allow build-arg for docker build ([#94](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/94)) ([7249559](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/72495597bfd19e0b5957baba1d2a0994b7e2ce3e))
* **docker-build:** allow dry-runs by always running build (even if push is disabled) ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** features and fixes ([#72](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/72)) ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** make image-tag and dockerfile optional ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** update to a Node.js 24 compatible Trivy GitHub action ([#122](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/122)) ([ee5d4dd](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/ee5d4dd3e7c835e1ea7eda91d1de954a4a92318b))
* init commit ([f4aa50d](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/f4aa50d5ca0d3ece5287dde5f798ea68168cdbaf))
* **release-please:** add release please ([#10](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/10)) ([e0bf189](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/e0bf1897865c2d9a6332752065b26568a31a0a7e))
* variabilize docker build platforms ([#81](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/81)) ([1d02b7e](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/1d02b7ee6d75c7d88046ebf3dd51b969c2a651ae))


### Bug Fixes

* **docker-build:** fix sarif security-report ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** update trivy-action to v0.34.1 and trivy to v0.69.2 ([#103](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/103)) ([567e5ac](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/567e5ac177f79ba92d960027f60ce4906595cd1f))


### Code Refactoring

* enforce an optimize single platform docker-build with failure on CRITICAL or HIGH fixed vulnerabilities detection ([#98](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/98)) ([59d6ea2](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/59d6ea284b1a9f75c8e2e7bb3f92ec900edc44f1))
