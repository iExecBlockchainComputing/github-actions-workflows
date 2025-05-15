# Rust Build Workflow

A reusable GitHub Actions workflow for building, testing, and publishing Rust packages.

## Features

- Build and test Rust packages
- Cache dependencies for faster builds
- Publish packages to crates.io
- Upload build artifacts

## Usage

```yaml
name: Rust CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    uses: your-org/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      rust-version: 'stable'
      build-target: 'release'
      enable-cache: true
      upload-artifact: true
      artifact-name: 'my-rust-app'
      artifact-path: 'target/release/my-app'
    secrets:
      CRATES_IO_TOKEN: ${{ secrets.CRATES_IO_TOKEN }}
```

## Inputs

| Name                | Description                                        | Default   | Required                            |
|---------------------|----------------------------------------------------|-----------|-------------------------------------|
| `rust-version`      | Rust version to use                                | `stable`  | No                                  |
| `build-target`      | Cargo profile to use for building (debug, release) | `release` | No                                  |
| `enable-cache`      | Enable caching of dependencies                     | `true`    | No                                  |
| `publish-crates-io` | Publish package to crates.io                       | `false`   | No                                  |
| `upload-artifact`   | Upload build artifact                              | `false`   | No                                  |
| `artifact-name`     | Name of the artifact to upload                     | -         | Only if `upload-artifact` is `true` |
| `artifact-path`     | Path to the artifact to upload                     | -         | Only if `upload-artifact` is `true` |

## Secrets

| Name              | Description                       | Required                              |
|-------------------|-----------------------------------|---------------------------------------|
| `CRATES_IO_TOKEN` | Token for publishing to crates.io | Only if `publish-crates-io` is `true` |

## Examples

### Basic Build and Test

```yaml
jobs:
  build-and-test:
    uses: your-org/github-actions-workflows/.github/workflows/rust-build.yml@main
```

### Build, Test, and Upload Artifact

```yaml
jobs:
  build-and-test:
    uses: your-org/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      upload-artifact: true
      artifact-name: 'my-rust-app'
      artifact-path: 'target/release/my-app'
```

### Build, Test, and Publish to crates.io

```yaml
jobs:
  build-and-publish:
    uses: your-org/github-actions-workflows/.github/workflows/rust-build.yml@main
    with:
      publish-crates-io: true
    secrets:
      CRATES_IO_TOKEN: ${{ secrets.CRATES_IO_TOKEN }}
```