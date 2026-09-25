# Docker Promote Workflow

## Overview

This reusable GitHub Actions workflow promotes an image that was already built, tested, and scanned by CI to a release tag. It copies the tested manifest by digest instead of rebuilding the image, so the released artifact is the same artifact that passed the pipeline.

The calling workflow must trigger promotion from a release tag such as `v1.2.3`.

## Features

- Waits for the CI workflow run for the tagged commit to complete successfully
- Validates that the release tag matches the project version file
- Resolves the source image digest before promotion
- Optionally re-scans the tested digest with Trivy
- Copies the tested manifest to the release tag
- Verifies that the release tag points at the tested digest

## Inputs

| Name | Description | Required | Default |
| --- | --- | --- | --- |
| `ci-workflow` | Workflow file used to find the CI run for the commit | No | `"ci.yaml"` |
| `image-name` | Fully qualified OCI image name, without a tag | Yes | - |
| `registry` | Registry hosting the image | No | `"docker-regis.iex.ec"` |
| `security-scan` | Enable the Trivy security scan before promotion | No | `true` |
| `source-tag-prefix` | Prefix used by CI before the short commit SHA | No | `"dev-"` |
| `trivy-version` | Trivy security scanner version | No | `"v0.71.0"` |
| `version-file` | File declaring the project version, relative to the repository root | No | `"gradle.properties"` |
| `version-regex` | `grep -E` expression matching the version declaration | No | `"^version="` |

## Secrets

| Name | Description | Required |
| --- | --- | --- |
| `username` | Registry username | Yes |
| `password` | Registry password with read and write access | Yes |

## Example Usage

```yaml
name: Release Docker Image

on:
  push:
    tags:
      - "v*.*.*"

jobs:
  promote:
    # ⚠️ use tagged version here
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/docker-promote.yml@main
    with:
      image-name: docker-regis.iex.ec/my-service
      security-scan: false
    secrets:
      username: ${{ secrets.NEXUS_USERNAME }}
      password: ${{ secrets.NEXUS_PASSWORD }}
```

## Notes

- The image must have been built and pushed by CI before promotion.
- The source tag is formed as `<source-tag-prefix><short-commit-sha>`.
- Set `security-scan: false` to skip the promotion-time Trivy scan. The CI build should still perform its configured scan.
- The registry credentials need read and write access because promotion creates the release tag.
- The workflow does not rebuild the image; it promotes the manifest and digest built by CI.
