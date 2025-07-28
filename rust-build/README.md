# Rust Build Workflow

A reusable GitHub Actions workflow for building, linting, testing, and publishing Rust packages, with optional dependency caching and working directory support.

## Features

- Build and test Rust packages
- Lint code using `clippy`
- Check formatting with `cargo fmt`
- Cache dependencies for faster builds
- Set a working directory (for monorepos or nested crates)
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
      working-directory: './my-crate'
      enable-cache: true
      publish-crates-io: false
    secrets:
      CARGO_REGISTRY_TOKEN: ${{ secrets.CARGO_REGISTRY_TOKEN }}
```

## Inputs

| Name                | Description                                               | Default  | Required |
| ------------------- | --------------------------------------------------------- | -------- | -------- |
| `rust-version`      | Rust version to use                                       | `stable` | No       |
| `working-directory` | The directory to run jobs from                            | `.`      | No       |
| `enable-cache`      | Enable caching of dependencies                            | `true`   | No       |
| `publish-crates-io` | Publish the package to crates.io (only if build succeeds) | `false`  | No       |

Note: All builds use the release profile by default. There is no build-target input anymore

## Secrets

| Name                   | Description                             | Required                              |
| ---------------------- | --------------------------------------- | ------------------------------------- |
| `CARGO_REGISTRY_TOKEN` | crates.io API token for `cargo publish` | Only if `publish-crates-io` is `true` |

## Examples

### Basic Build and Test

```yaml
jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
```

### Specify a Working Directory

```yaml
jobs:
  build-and-test:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      working-directory: './my-crate'
```

### Publish to crates.io (requires CARGO_REGISTRY_TOKEN)

```yaml
jobs:
  build-and-publish:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      publish-crates-io: true
    secrets:
      CARGO_REGISTRY_TOKEN: ${{ secrets.CARGO_REGISTRY_TOKEN }}
```