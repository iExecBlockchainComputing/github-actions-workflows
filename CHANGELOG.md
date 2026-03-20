# Changelog

## 1.0.0 (2026-03-20)


### ⚠ BREAKING CHANGES

* enforce an optimize single platform docker-build with failure on CRITICAL or HIGH fixed vulnerabilities detection ([#98](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/98))
* remove useless `command` option ([#83](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/83))
* **rust-build:** remove build-target workflow input to enforce use of release builds and remove artifact upload step
* **sconify:** move usernames to secret and ouput tags ([#77](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/77))
* **docker-build:** make it more reusable ([#17](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/17))
* **release-please:** fix version and secrets names ([#19](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/19))

### Features

* add dry run mode for transaction validation in multisig proposal ([#92](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/92)) ([220279d](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/220279deca9bd1b96645da47795b4fcb0a8238ad))
* Add new Safe Wallet reusable workflow ([#85](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/85)) ([2d48427](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/2d48427e65fdafa7d1cecaf698206611e034c60a))
* add security scan ([#6](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/6)) ([4f91f55](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/4f91f5525d8c7986d9aa1b1273ec229da39a7dec))
* allow build-arg for docker build ([#94](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/94)) ([7249559](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/72495597bfd19e0b5957baba1d2a0994b7e2ce3e))
* change ci and path trigger ([44db125](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/44db1257a68422bcec273a80f75173012cb30f56))
* **conventional-commits:** add sticky comments for PR title linting ([#57](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/57)) ([01a8e06](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/01a8e0659352b5660d4241e5b1b92f18faa6a4eb))
* **conventional-commits:** update workflow ([#48](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/48)) ([d7d5455](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/d7d5455c9dcd381bc907d4865e9693ce02082695))
* **docker-build:** add security report option and upload step ([#37](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/37)) ([5d6d470](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/5d6d470b30eb5be75ebb0c78b3477511bb9fa272))
* **docker-build:** add some vars ([#14](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/14)) ([b56bba2](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/b56bba2f4ae61f67bcb2a442a119855cdb4a133d))
* **docker-build:** allow dry-runs by always running build (even if push is disabled) ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** enhance reporting ([#39](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/39)) ([298ec52](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/298ec521fe7ea48c81258dc259014b9182fa4cc3))
* **docker-build:** expose checksum as 0x&lt;sha256&gt; ([#99](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/99)) ([7394bd5](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/7394bd51a52c0ee8b65f5db4fc5f76f65587b8c4))
* **docker-build:** features and fixes ([#72](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/72)) ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** make image-tag and dockerfile optional ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker:** add GitHub Actions workflow for deploying ([#61](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/61)) ([033e539](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/033e539e77a0485f3b17f46a22e656d7e8df1081))
* init commit ([f4aa50d](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/f4aa50d5ca0d3ece5287dde5f798ea68168cdbaf))
* make NPM package scope optional with default value ([#31](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/31)) ([f5cc41e](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/f5cc41ef8638d3c6b726984b9750dccaba936e48))
* **npm:** add tag ([#29](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/29)) ([bf2d7ab](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/bf2d7ab8fa561d36c00059895942b1ea7ed753d7))
* **npm:** add workdirectory ([#59](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/59)) ([92f4a25](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/92f4a250a64abe84d3df2ced8b4597395b87fd52))
* **publish-npm:** add dry-run option ([#71](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/71)) ([d8a0c33](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/d8a0c3389b39c9f6d15c16716b030777dea694cd))
* **publish-npm:** enhance additional inputs ([#18](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/18)) ([f4459c7](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/f4459c72016280d3071b3f1772e6e43946b44c12))
* **publish-npm:** enhance workflow ([#62](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/62)) ([27e1a51](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/27e1a51cf2c294fc97f498264ed8b2d958b31f04))
* **release-please:** add release please ([#10](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/10)) ([e0bf189](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/e0bf1897865c2d9a6332752065b26568a31a0a7e))
* **release-please:** add target branch configuration ([#42](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/42)) ([08a8fbb](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/08a8fbb944bab2110e18b1f2533dd6f9012c7cf9))
* **rust-build:** add reusable workflow ([#44](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/44)) ([a875d5c](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/a875d5c333940b4a9fe28b09f3e6fd3c50cb2407))
* **rust-build:** enhance Rust workflow with linting and formatting ([#79](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/79)) ([3d74713](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/3d74713f2963916140bc6fea8846707e2b07e32c))
* **rust-build:** update checkout and cache actions in rust-build workflow ([267c441](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/267c44168d488ed57102d6b855abae18378c1888))
* **sconify:** add sconify workflow ([#66](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/66)) ([2ad461c](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/2ad461c476208a41534e279ff247a94d204941e9))
* **sconify:** move usernames to secret and ouput tags ([#77](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/77)) ([c3101d7](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/c3101d785b6c282d3ce4fdd4bba5e16b44a2bd0f))
* **stale:** add stale ([#15](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/15)) ([3891c0f](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/3891c0f02e51699d9992cb277d2d62185bd48dfb))
* support tokenless trusted publishers ([#90](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/90)) ([b4720bb](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/b4720bb49bdadc367cdefb9794526d09f08d48c3))
* trigger after fix ci ([247c41f](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/247c41ffee0de0ae3e047e7f6555ba37acf15d0a))
* trigger docker changes ([9f21f89](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/9f21f8961b7e439bb85febffd587e6cda07eff5a))
* variabilize docker build platforms ([#81](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/81)) ([1d02b7e](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/1d02b7ee6d75c7d88046ebf3dd51b969c2a651ae))


### Bug Fixes

* **conventional-commits:** file type ([#49](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/49)) ([4fea4f9](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/4fea4f9ac0ffbb1c7300c28a93cf5e108ae01b4c))
* **conventional-commits:** remove reserved name secret ([#53](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/53)) ([13ccbee](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/13ccbee116ea9c36dca3c7c6eb87561297d7841a))
* **docker-build:** fix sarif security-report ([705ad86](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/705ad866bb4d832f5246f09d92dafab21a87de63))
* **docker-build:** make it more reusable ([#17](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/17)) ([e11b377](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/e11b377b8ed53820151de5687ecac0b09c251810))
* **docker-build:** secrets ([#2](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/2)) ([7368a4e](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/7368a4e617903a09e0b426d50d8b99abb7107bf9))
* **docker-build:** secrets inputs ([#4](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/4)) ([41411e9](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/41411e9b11230d6afad0fc8b2cf60b99154448d9))
* **docker-build:** skip hadolint comment outside of PR context ([#75](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/75)) ([4ac41dd](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/4ac41dd0e87a61710ebc19303bc15ada656d9a12))
* **docker-build:** update trivy-action to v0.34.1 and trivy to v0.69.2 ([#103](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/103)) ([567e5ac](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/567e5ac177f79ba92d960027f60ce4906595cd1f))
* **docker-build:** upgrade to Trivy GitHub action v0.35.0 ([1a4763b](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/1a4763bcdba08bad8b86bea52f3a5a01ca152b92))
* indentation issues in deploy-docker workflow ([#88](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/88)) ([a46faf8](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/a46faf860b48d96206d1924fa57bc170e0c0934c))
* **npm:** change install command ([#25](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/25)) ([2bfe767](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/2bfe7670ae21668e5ac1266e0d180943b46cb0c6))
* **release-please:** add issues permission ([#34](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/34)) ([11a7271](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/11a72718faa9b81c29f14ec326b485f73dbc9fd6))
* **release-please:** fix version and secrets names ([#19](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/19)) ([5a1aa26](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/5a1aa26b5c835b776844af16048564622ba65cfe))
* remove useless `command` option ([#83](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/83)) ([d0c027a](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/d0c027a370d637d6badce22df0e5af53c4c0e371))
* replace checksum prefix to 0x (docker-build) ([#101](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/101)) ([da7b622](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/da7b6227aadcdc482da81e7b9d46ebcd5b986ae1))
* tag of aquasecurity ([#8](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/8)) ([1d3ff47](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/1d3ff475697b55b43dd42eb600d41cd42d8d0d37))


### Code Refactoring

* enforce an optimize single platform docker-build with failure on CRITICAL or HIGH fixed vulnerabilities detection ([#98](https://github.com/iExecBlockchainComputing/github-actions-workflows/issues/98)) ([59d6ea2](https://github.com/iExecBlockchainComputing/github-actions-workflows/commit/59d6ea284b1a9f75c8e2e7bb3f92ec900edc44f1))
