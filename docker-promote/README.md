# Docker Promote Workflow

## Overview

This reusable GitHub Actions workflow promotes an image that was already built, tested, and scanned by CI to a release tag. It copies the tested manifest by digest instead of rebuilding the image, so the released artifact is the same artifact that passed the pipeline.

The calling workflow must trigger promotion from a release tag such as `vX.Y.Z`, or `component-vX.Y.Z` when release-please includes the component name in the tag.

> [!IMPORTANT] Promotion never rebuilds the image. CI must have built and pushed the source tag for the tagged commit before this workflow can promote it.

## Features

- Validates that the release tag matches the version release-please recorded for the component
- Waits for the CI workflow run for the tagged commit to complete successfully
- Reuses the exact image tag CI recorded for the commit from the `docker-image-tag` artifact, and fails if the CI run did not publish one
- Resolves the source image digest before promotion
- Optionally re-scans the tested digest with Trivy
- Copies the tested manifest to the release tag
- Verifies that the release tag points at the tested digest

## Inputs

| Name | Description | Required | Default |
| --- | --- | --- | --- |
| `ci-workflow` | Workflow file used to find the CI run for the commit | No | `"ci.yaml"` |
| `image-name` | Fully qualified OCI image name, without a tag | Yes | - |
| `registry` | Registry hosting the image | No | `"docker.io"` |
| `security-scan` | Enable the Trivy security scan before promotion | No | `true` |
| `trivy-version` | Trivy security scanner version | No | `"v0.71.0"` |

## Secrets

| Name       | Description                                  | Required |
| ---------- | -------------------------------------------- | -------- |
| `username` | Registry username                            | Yes      |
| `password` | Registry password with read and write access | Yes      |

## Example Usage

The source tag is not passed to this workflow: it is fetched from the `docker-image-tag` artifact that the CI run for the tagged commit uploaded (published by `docker-build` when `push: true`).

```yaml
name: Release Docker Image

on:
  push:
    tags:
      - "v*.*.*"
      - "*-v*.*.*"

jobs:
  promote:
    # ⚠️ use tagged version here
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/docker-promote.yml@main
    with:
      image-name: docker-regis.iex.ec/my-service
      registry: docker-regis.iex.ec
      security-scan: false
    secrets:
      username: ${{ secrets.NEXUS_USERNAME }}
      password: ${{ secrets.NEXUS_PASSWORD }}
```

The flow:

1. **CI workflow** — builds the image, tags it (e.g. via a `prepare` job), pushes it, and uploads the applied tag as the `docker-image-tag` artifact.
2. **Release workflow** — this one. On `vX.Y.Z` (or `component-vX.Y.Z`) it waits for that CI run, downloads the artifact to learn the exact tag CI pushed, and promotes that digest to the release tag.

## Notes

- The release tag must point at a commit that is contained in `main`; the workflow refuses to release a tag created elsewhere.
- The tag version is compared with the version release-please recorded for the component, so the check works for any release type (`simple`, `gradle`, `rust`, `node`, …) without reading project files.
- Both `vX.Y.Z` and the release-please component form `<component>-vX.Y.Z` are accepted; everything up to the last `-v` is treated as the component name.
- A tag without a component is matched against the `.` package, or against the single entry of the manifest.
- A component is matched against a manifest key by full path or by its last segment, so `post-compute` resolves the key `post-compute` and a workspace path such as `crates/post-compute`.
- The project must be released by release-please in manifest mode; `.release-please-manifest.json` is committed in the same PR as the version bump, so at the tagged commit it holds the version being released.
- The source tag is the tag `docker-build` recorded in the `docker-image-tag` artifact of the CI run for the commit, so any CI tag scheme (`dev-<sha>`, `feature-<sha>`, `cid.<sha>.main`, …) is supported. Promotion fails with a clear error if the CI run did not publish the artifact.
- Set `security-scan: false` to skip the promotion-time Trivy scan. The CI build should still perform its configured scan.
- Keep `trivy-version` in sync with the version used by `docker-build` so a promotion finding reflects a vulnerability database update rather than a scanner change.
- The registry credentials need read and write access because promotion creates the release tag.

## Troubleshooting

- **Tag is not on main** — create the release tag from a commit reachable from `main`, or fix the tag that was created from another branch.
- **No .release-please-manifest.json** — the project is not released by release-please in manifest mode; configure release-please with a `packages` map so it maintains the manifest.
- **No version recorded for the component** — the tag prefix is not a package in `.release-please-manifest.json`; check the `component` names in `release-please-config.json`.
- **Tag version does not match the recorded version** — the tag is expected to be `v` or `<component>-v` followed by the version release-please released for that component.
- **Timed out waiting for the CI run** — confirm that `ci-workflow` names the workflow that builds the image and that it has started for the tagged commit.
- **CI did not publish the docker-image-tag artifact** — the CI workflow named by `ci-workflow` must build the image with a `docker-build` version that records and uploads the `docker-image-tag` artifact (`push: true`); promotion cannot infer the tag otherwise.
- **Source image or digest cannot be resolved** — confirm that CI pushed `<image-name>:<source-tag>` to `registry`.
- **Release tag does not point at the tested image** — the registry or buildx version may not support manifest promotion; keep the buildx setup step up to date.
- **Trivy reports CRITICAL or HIGH vulnerabilities** — the promotion is stopped before the release tag is created; update the image and rerun the release.
