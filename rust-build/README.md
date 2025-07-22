# Rust Build and Test Workflow

A reusable GitHub Actions workflow for building, linting, testing, and auditing Rust packages.

## Features

- Build and test Rust packages
- Lint code using clippy
- Check formatting with cargo fmt
- Run security audits with cargo audit
- Cache dependencies for faster builds

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
```

## Inputs

| Name            | Description                                    | Default   | Required |
| --------------- | ---------------------------------------------- | --------- | -------- |
| `rust-version`  | Rust version to use                            | `stable`  | No       |
| `build-profile` | Cargo profile to use (debug, release)          | `release` | No       |
| `run-audit`     | Run `cargo audit` for security vulnerabilities | `true`    | No       |
| `enable-cache`  | Enable caching of dependencies                 | `true`    | No       |

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
  jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      build-profile: 'debug'
```