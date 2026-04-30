# 🐳 Docker Build Cloud — Multi-Platform Workflow

## 🔍 Overview

This reusable GitHub Actions workflow builds and pushes a multi-platform Docker image to Docker Hub using [Docker Build Cloud](https://docs.docker.com/build-cloud/) remote builders. It produces a single multi-arch manifest (e.g. `linux/amd64` + `linux/arm64`) in one job, with no QEMU emulation and no native ARM runners required.

## ✨ Features

- 🏗️ Multi-platform build in a single job via Docker Build Cloud's remote builders
- 🔐 Authenticates to DockerHub for both registry push and DBC endpoint access
- 🏷️ Tags the image with `<image-name>:<image-tag>` and optionally `<image-name>:latest`
- 📦 Returns the multi-arch manifest digest for downstream signing or SBOM use cases
- 🚀 No QEMU emulation, no native ARM runners — DBC handles arch-specific builds

> [!IMPORTANT]
> Requires a Docker Build Cloud subscription and a builder configured in your DockerHub organization. The DockerHub PAT must have the **Build** scope to authenticate to the cloud endpoint.

## ⚙️  Inputs

| Name                     | Description                                                                       | Required | Default        |
| ------------------------ | --------------------------------------------------------------------------------- | -------- | -------------- |
| `build-args`             | Docker build arguments (multiline format: `KEY1=value1\nKEY2=value2`)             | No       | `""`           |
| `cloud-builder-endpoint` | Docker Build Cloud endpoint, format `<dbc-org>/<builder>`                         | Yes      | -              |
| `context`                | Path to Docker Build Context                                                      | No       | `"."`          |
| `dockerfile`             | Path to the Dockerfile (e.g. `'./Dockerfile'`, `'./docker/Dockerfile'`)           | No       | `"Dockerfile"` |
| `image-name`             | Name of Docker Image, fully qualified (e.g. `iexechub/my-image`)                  | Yes      | -              |
| `image-tag`              | Tag to apply to the built image (e.g. `1.0.0`, no v prefix)                       | Yes      | -              |
| `platforms`              | Comma-separated build platforms (e.g. `linux/amd64,linux/arm64`)                  | Yes      | -              |
| `push-latest`            | Also push the image with the `:latest` tag                                        | No       | `false`        |

## 🔐 Secrets

| Name                 | Description                                                                                | Required |
| -------------------- | ------------------------------------------------------------------------------------------ | -------- |
| `dockerhub-username` | Username for Docker Hub authentication                                                     | Yes      |
| `dockerhub-password` | Personal Access Token for Docker Hub with the **Build** scope (needed for DBC endpoint)    | Yes      |

## 📤 Outputs

| Name     | Description                                       |
| -------- | ------------------------------------------------- |
| `digest` | Multi-arch manifest digest of the published image |

## 💻 Example Usage

```yaml
name: Build and Push Release Image

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  build-multiplatform:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/docker-build-cloud.yml@main # ⚠️ use tagged version here
    with:
      image-name: iexechub/my-image
      image-tag: ${{ github.ref_name }}
      platforms: linux/amd64,linux/arm64
      cloud-builder-endpoint: ${{ vars.DOCKER_CLOUD_BUILDER_LABEL }}
      push-latest: true
    secrets:
      dockerhub-username: ${{ secrets.DOCKERHUB_USERNAME }}
      dockerhub-password: ${{ secrets.DOCKERHUB_TOKEN }}
```

## 📝 Notes

- 🔒 The DockerHub PAT must have the **Build** scope, not just Read/Write — DBC endpoints will return `403 Forbidden` otherwise.
- 🪪 The user owning the PAT must be a member of the cloud builder (Docker Hub → org → Build Cloud → builder → Members).
- 🔁 Login to DockerHub MUST run before `setup-buildx-action` — the cloud driver reads `~/.docker/config.json` at bootstrap.

## 🛠️ Troubleshooting

- **`403 Forbidden` on Set up Docker Buildx**: PAT missing Build scope, user not a member of the cloud builder, token owner not in the builder org, malformed endpoint, or inactive DBC subscription.
- **Manifest only contains one platform**: confirm `platforms` input lists every arch with commas (no spaces).
- **Empty `digest` output**: `docker/build-push-action@v7` only sets `digest` when `push: true` — verify the workflow is not running in dry-run mode.
