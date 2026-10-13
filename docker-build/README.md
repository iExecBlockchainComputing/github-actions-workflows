# 🐳 Docker Build Workflow

## 🔍 Overview

This reusable GitHub Actions workflow automates the process of building and pushing Docker images to a Docker Registry. It simplifies the Docker build process in your CI/CD pipeline by handling authentication, building, and tagging in a standardized way. Perfect for teams looking to streamline their containerization workflow with minimal configuration.

## ✨ Features

- 🔐 Securely authenticates with a Docker Registry using best practices, using credentials stored as GitHub Secrets
- 🧭 Keeps the Docker Hub pull login and the registry push login separate, and skips the former when the target registry already is Docker Hub
- 🏭 Builds optimized Docker images from a specified Dockerfile
- 🔖 Intelligently tags and pushes images to a Docker Registry
- 🔎 Scan for vulnerabilities with Trivy
- 👍 Lint dockerfile
- 📜 Generates & signs a keyless SLSA build provenance attestation (optional)
- 🚀 Optimizes build performance with layer caching
- 📦 Supports AMD64 and ARM64 platforms (one per workflow run)
- 📥 Optionally pulls a build artifact from an earlier job into the build context, so a compiled binary or jar can be built once and copied into the image

> [!IMPORTANT] Due to a limitation on Trivy analysis, the workflow targets a single platform. A workflow instance should be configured for each targeted platform.

## ⚙️ Inputs

| Name | Description | Required | Default |
| --- | --- | --- | --- |
| `artifact-name` | Name of an artifact to download into the build context before building, e.g. a jar produced by an earlier job (leave empty to skip) | No | `""` |
| `artifact-path` | Destination path for the downloaded artifact, relative to the workspace (ignored if `artifact-name` is empty) | No | `""` |
| `attest` | Generate & sign a keyless SLSA build provenance attestation for the pushed image (requires `push: true` and caller permissions, see notes) | No | `false` |
| `build-args` | Docker build arguments (multiline format: `KEY1=value1\nKEY2=value2`) | No | `""` |
| `context` | Path to Docker Build Context | No | `"."` |
| `dockerfile` | Path to the Dockerfile to build (e.g., './Dockerfile', './docker/Dockerfile') | No | `"Dockerfile"` |
| `dockerhub-login` | Log in to Docker Hub before the build, to avoid anonymous pull rate limits on base images. Ignored when `push: true` and `registry` already points at Docker Hub, since the push login covers that host | No | `true` |
| `hadolint` | Enable Hadolint | No | `true` |
| `image-name` | Name of Docker Image (e.g., 'myimage', 'myorg/myimage') | true | - |
| `image-tag` | Tag to apply to the built image (e.g., 'latest', 'v1.2.3') | No | `"latest"` |
| `platform` | Indicates which platform the image should be built for | No | `"linux/amd64"` |
| `push` | Push Docker Image to Registry | No | `false` |
| `registry` | Docker Registry | No | `"docker.io"` |
| `runner` | GitHub Actions runner label | No | `"ubuntu-latest"` |
| `security-report` | Security Report Mode (`"sarif"` \| `"comment"`; ignored if `security-scan: false`) | No | `"sarif"` |
| `security-scan` | Enable Trivy Security Scan | No | `true` |
| `trivy-version` | Override Trivy security scanner version | No | `v0.71.0` |

## 🔐 Secrets

| Name | Description | Required |
| --- | --- | --- |
| `username` | Username for Docker Registry authentication | When `push: true` |
| `password` | Password or Personal Access Token for Docker registry authentication (with appropriate permissions) | When `push: true` |
| `dockerhub-username` | Username for Docker Hub authentication (pull-only, used when `dockerhub-login: true`) | When a Docker Hub login is still needed |
| `dockerhub-password` | Token for Docker Hub authentication (with read-only permissions) | When a Docker Hub login is still needed |

The two pairs serve different purposes and are **not** interchangeable:

- `username` / `password` authenticate the **push** against `registry`, and are the only credentials needed when `push: true`.
- `dockerhub-username` / `dockerhub-password` only raise the **pull** rate limit on base images (`FROM golang:…`, `FROM alpine:…`).

When `push: true` and `registry` already points at Docker Hub, the push login covers that host, so the workflow **skips** the Docker Hub login and the `dockerhub-*` secrets are not needed. A second login would only overwrite the first in `~/.docker/config.json`. Set `dockerhub-login: false` to skip the pull login explicitly, e.g. when every base image comes from a private mirror.

## 📤 Outputs

| Name       | Description                            |
| ---------- | -------------------------------------- |
| `checksum` | Checksum (`0x...`) of the Docker image |

The built image tag, digest and checksum are visible on the workflow run summary.

## 💻 Example Usage

Pushing to Docker Hub only needs the push credentials, because that login already covers pulling base images from Docker Hub:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
  # Also trigger on tag creation for release versioning
  tags:
    - "v*.*.*"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Fetch all history for proper versioning

      - name: Build and Push Docker Image
        uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/docker-build.yml@main # ⚠️ use tagged version here
        with:
          image-name: "docker.io/username/my-image"
          registry: "docker.io"
          push: true
          dockerfile: "Dockerfile"
          build-args: |
            BUILD_VERSION=1.0.0
            NODE_ENV=production
        secrets:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PAT }}
```

Pushing to another registry, such as a private Nexus, keeps the Docker Hub pull login separate so base images are still fetched above the anonymous rate limit:

```yaml
- name: Build and Push Docker Image
  uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/docker-build.yml@main # ⚠️ use tagged version here
  with:
    image-name: "docker-regis.iex.ec/my-image"
    registry: "docker-regis.iex.ec"
    push: true
  secrets:
    dockerhub-username: ${{ secrets.DOCKERHUB_USERNAME }}
    dockerhub-password: ${{ secrets.DOCKERHUB_TOKEN_PULL_ONLY }}
    username: ${{ secrets.NEXUS_USERNAME }}
    password: ${{ secrets.NEXUS_PASSWORD }}
```

## 📝 Notes

- 🔖 You can specify any valid Docker tag format in the `image-tag` input
- 📤 When `push: true`, the applied tag is also saved as a `docker-image-tag` artifact, so `docker-promote` can promote the exact image CI built for a commit rather than reconstruct its tag
- 📜 When `attest: true`, the attestation is only generated if `push: true`, and the **caller** workflow must grant the following permissions:
  ```yaml
  permissions:
    id-token: write
    attestations: write
  ```

## 🛠️ Troubleshooting

- If you encounter authentication issues, verify your Docker Registry credentials are correct and have appropriate permissions
- ❌ **`push is enabled but 'username'/'password' are missing`** — pass the credentials of `registry`, or set `push: false`
- ❌ **`dockerhub-login is enabled but 'dockerhub-username'/'dockerhub-password' are missing`** — the pull login is requested but no credential was given; pass them, or set `dockerhub-login: false` when base images come from a private mirror. Not raised when pushing to Docker Hub, since that login is skipped as redundant
- ❌ **Base image pull fails with a rate limit error** — set `dockerhub-login: true` and pass the `dockerhub-*` secrets
- For build failures, check your Dockerfile syntax and ensure all referenced files exist
- Large images may take longer to push - consider optimizing your Dockerfile with multi-stage builds
- If you need to debug the build process, you can add the `ACTIONS_STEP_DEBUG` secret set to `true` in your repository
