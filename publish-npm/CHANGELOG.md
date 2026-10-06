# Changelog

## [2.0.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.7.3...publish-npm-v2.0.0) (2026-10-06)


### ⚠ BREAKING CHANGES

* **publish-npm:** the default node-version is now 24 instead of 20. Callers using OIDC trusted publishing must use Node.js >= 24.5.0: npm is no longer upgraded automatically.
* **publish-npm:** install-command, build-command, test-command, lint-command, type-check-command and format-check-command now only accept a single command with its arguments. Multi-line scripts, `&&`, `;`, pipes, redirections, quotes and inline env assignments (`FOO=bar cmd`) are no longer supported; move such logic into an npm script and call it with `npm run <script>`.

### Bug Fixes

* **publish-npm:** pass command inputs through env to prevent template injection ([#183](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/183)) ([6c75d58](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/6c75d58f314949c61bd4c68becbfeb5520a6a3f7))
* **publish-npm:** stop installing npm at runtime and default to node 24 ([#184](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/184)) ([486fdd6](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/486fdd698ee0e839fa8fca59f30f221b4658e3c3))

## [1.7.3](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.7.2...publish-npm-v1.7.3) (2026-10-05)


### Bug Fixes

* checkout with persist-credentials: false ([#181](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/181)) ([738ae7b](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/738ae7b79b6375b421ac1f5571e625482e78e161))
* **publish-npm:** pass version input through env to prevent template injection ([#182](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/182)) ([ca31c13](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/ca31c1377305e1a7f2520246cb07ee8f314a0b01))

## [1.7.2](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.7.1...publish-npm-v1.7.2) (2026-10-02)


### Bug Fixes

* **publish-npm:** fix shellcheck findings in npm scripts ([#165](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/165)) ([929ad08](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/929ad0892a16827ab429a7c78599195dabc81313))
* update third-party GitHub Actions ([#167](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/167)) ([396fc60](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/396fc60de4f14227e21a68d470bab7dd4d9b14f4))

## [1.7.1](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.7.0...publish-npm-v1.7.1) (2026-09-04)


### Bug Fixes

* pin third-party GitHub Actions to commit SHA ([#136](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/136)) ([a69a256](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/a69a25679b7d47df1256596f1fc9df0fdc38a8a8))

## [1.7.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.6.0...publish-npm-v1.7.0) (2026-09-01)


### Features

* **publish-npm:** add Socket Firewall to block malicious package installs ([#133](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/133)) ([a507fb1](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/a507fb114c81d7e0d5c484ef4c1a3a0fbc8991c4))

## [1.6.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.5.0...publish-npm-v1.6.0) (2025-10-16)


### Features

* support tokenless trusted publishers ([#90](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/90)) ([b4720bb](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/b4720bb49bdadc367cdefb9794526d09f08d48c3))

## [1.5.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.4.0...publish-npm-v1.5.0) (2025-07-02)


### Features

* **publish-npm:** add dry-run option ([#71](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/71)) ([d8a0c33](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/d8a0c3389b39c9f6d15c16716b030777dea694cd))

## [1.4.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.3.0...publish-npm-v1.4.0) (2025-06-16)


### Features

* **publish-npm:** enhance workflow ([#62](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/62)) ([27e1a51](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/27e1a51cf2c294fc97f498264ed8b2d958b31f04))

## [1.3.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.2.0...publish-npm-v1.3.0) (2025-06-10)


### Features

* **npm:** add workdirectory ([#59](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/59)) ([92f4a25](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/92f4a250a64abe84d3df2ced8b4597395b87fd52))

## [1.2.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.1.0...publish-npm-v1.2.0) (2025-04-04)


### Features

* make NPM package scope optional with default value ([#31](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/31)) ([f5cc41e](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/f5cc41ef8638d3c6b726984b9750dccaba936e48))

## [1.1.0](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.0.1...publish-npm-v1.1.0) (2025-04-03)


### Features

* **npm:** add tag ([#29](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/29)) ([bf2d7ab](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/bf2d7ab8fa561d36c00059895942b1ea7ed753d7))

## [1.0.1](https://github.com/iExecBlockchainComputing/github-actions-workflows/compare/publish-npm-v1.0.0...publish-npm-v1.0.1) (2025-04-01)


### Bug Fixes

* **npm:** change install command ([#25](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/25)) ([2bfe767](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/2bfe7670ae21668e5ac1266e0d180943b46cb0c6))

## 1.0.0 (2025-03-17)


### Features

* **publish-npm:** enhance additional inputs ([#18](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/18)) ([f4459c7](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/f4459c72016280d3071b3f1772e6e43946b44c12))
