# Rust Build Workflow

A reusable GitHub Actions workflow for building, linting, testing, and auditing Rust packages, with optional artifact upload and crates.io publishing.

## Features

- Build and test Rust packages
- Lint code using `clippy`
- Check formatting with `cargo fmt`
- Run security audits with `cargo audit`
- Cache dependencies for faster builds
- Upload build artifacts
- Publish to crates.io

## Usage

```yaml
name: Rust CI

on: [pull_request]

jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      rust-version: 'stable'
      build-profile: 'release'
      run-audit: true
      enable-cache: true
      upload-artifact: true
      artifact-name: my-crate
      artifact-path: target/release/my-crate
    secrets:
      CRATES_IO_TOKEN: ${{ secrets.CRATES_IO_TOKEN }}
```

## Inputs

| Name                | Description                                                  | Default   | Required |
| ------------------- | ------------------------------------------------------------ | --------- | -------- |
| `rust-version`      | Rust version to use                                          | `stable`  | No       |
| `build-profile`     | Cargo profile to use for building (`debug`, `release`, etc.) | `release` | No       |
| `run-audit`         | Run `cargo audit` for security vulnerabilities               | `true`    | No       |
| `enable-cache`      | Enable caching of dependencies                               | `true`    | No       |
| `upload-artifact`   | Upload a build artifact after building                       | `false`   | No       |
| `artifact-name`     | Name of the artifact to upload                               | –         | No       |
| `artifact-path`     | Path to the artifact to upload                               | –         | No       |
| `publish-crates-io` | Publish the package to crates.io (only if build succeeds)    | `false`   | No       |

## Secrets

| Name              | Description                             | Required                              |
| ----------------- | --------------------------------------- | ------------------------------------- |
| `CRATES_IO_TOKEN` | crates.io API token for `cargo publish` | Only if `publish-crates-io` is `true` |

## Examples

### Basic Build and Test

```yaml
jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
```

### Disable Security Audit

```yaml
jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      run-audit: false
```

### Use Debug Profile

```yaml
jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      build-profile: 'debug'
```

### Upload Artifact After Build

```yaml
jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      upload-artifact: true
      artifact-name: my-crate
      artifact-path: target/release/my-crate
```

### Publish to crates.io (requires CRATES_IO_TOKEN)

```yaml
jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      publish-crates-io: true
    secrets:
      CRATES_IO_TOKEN: ${{ secrets.CRATES_IO_TOKEN }}
```