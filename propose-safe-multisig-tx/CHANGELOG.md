# Changelog

## [2.0.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/propose-safe-multisig-tx-v1.1.1...propose-safe-multisig-tx-v2.0.0) (2026-09-21)


### ⚠ BREAKING CHANGES

* **rust-build:** retroactively document breaking change shipped in 2.1.1 ([#146](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/146))

### Features

* **rust-build:** add Socket Firewall to block malicious crate installs ([#148](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/148)) ([527836d](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/527836dc90417d4e98c51711d295c159bae42d4e))


### Bug Fixes

* **ci:** remove last-release-sha override from release workflow ([#145](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/145)) ([5ba9c03](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/5ba9c03f10b58b22c2877aabc7b93d231fcdc662))
* **propose-safe-multisig-tx:** update deps to fix vulnerabilities in transient deps `undici` and `ws` ([#149](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/149)) ([43ce889](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/43ce889cf677e45858bae3db44bb14e48fc58c25))
* **rust-build:** retroactively document breaking change shipped in 2.1.1 ([#146](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/146)) ([31b8517](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/31b851752b8024dc0e383c536cb6a5991c023889))

## [1.1.1](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/propose-safe-multisig-tx-v1.1.0...propose-safe-multisig-tx-v1.1.1) (2026-09-04)


### Bug Fixes

* pin third-party GitHub Actions to commit SHA ([#136](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/136)) ([a69a256](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/a69a25679b7d47df1256596f1fc9df0fdc38a8a8))

## [1.1.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/propose-safe-multisig-tx-v1.0.0...propose-safe-multisig-tx-v1.1.0) (2025-11-12)


### Features

* add dry run mode for transaction validation in multisig proposal ([#92](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/92)) ([220279d](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/220279deca9bd1b96645da47795b4fcb0a8238ad))

## 1.0.0 (2025-10-06)


### Features

* Add new Safe Wallet reusable workflow ([#85](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/85)) ([2d48427](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/2d48427e65fdafa7d1cecaf698206611e034c60a))

## 1.0.0 (2025-09-29)

### Features

* **safe-transaction:** add workflow for safe transaction submission ([#85](https://github.com/iExecBlockchainComputing/github-actions-workflows/pull/85))
