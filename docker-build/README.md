# 🐳 Docker Build Workflow

## 🔍 Overview

This reusable GitHub Actions workflow automates the process of building and pushing Docker images to a Docker Registry.
It simplifies the Docker build process in your CI/CD pipeline by handling authentication, building, and tagging in a standardized way.
Perfect for teams looking to streamline their containerization workflow with minimal configuration.

## ✨ Features

- 🔐 Securely authenticates with a Docker Registry using best practices
- 🏗️ Builds optimized Docker images from a specified Dockerfile
- 🏷️ Intelligently tags and pushes images to a Docker Registry
- 🔎 Scan for vulnerabilities with Trivy
- 👍 Lint dockerfile
- 🛡️ Handles authentication securely using GitHub Secrets
- 🚀 Optimizes build performance with layer caching
- 📦 Supports AMD64 and ARM64 platforms (one per workflow run)

> [!IMPORTANT]
> Due to a limitation on Trivy analysis, the workflow targets a single platform.
> A workflow instance should be configured for each intended targeted platform.

## ⚙️ Inputs

| Name              | Description                                                                        | Required | Default         |
| ----------------- | ---------------------------------------------------------------------------------- | -------- | --------------- |
| `build-args`      | Docker build arguments (multiline format: `KEY1=value1\nKEY2=value2`)              | No       | `""`            |
| `context`         | Path to Docker Build Context                                                       | No       | `"."`           |
| `dockerfile`      | Path to the Dockerfile to build (e.g., './Dockerfile', './docker/Dockerfile')      | No       | `"Dockerfile"`  |
| `hadolint`        | Enable Hadolint                                                                    | No       | `true`          |
| `image-name`      | Name of Docker Image (e.g., 'myimage', 'myorg/myimage')                            | true     | -               |
| `image-tag`       | Tag to apply to the built image (e.g., 'latest', 'v1.2.3')                         | No       | `"latest"`      |
| `platform`        | Indicates which platform the image should be built for                             | No       | `"linux/amd64"` |
| `push`            | Push Docker Image to Registry                                                      | No       | `false`         |
| `registry`        | Docker Registry                                                                    | No       | `"docker.io"`   |
| `security-report` | Security Report Mode (`"sarif"` \| `"comment"`; ignored if `security-scan: false`) | No       | `"sarif"`       |
| `security-scan`   | Enable Trivy Security Scan                                                         | No       | `true`          |

## 🔐 Secrets

| Name       | Description                                                                                         | Required |
| ---------- | --------------------------------------------------------------------------------------------------- | -------- |
| `username` | Username for Docker Registry authentication                                                         | Yes      |
| `password` | Password or Personal Access Token for Docker registry authentication (with appropriate permissions) | Yes      |

## 💻 Example Usage

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
          image-name: "username/my-image"
          dockerfile: "Dockerfile"
          build-args: |
            BUILD_VERSION=1.0.0
            NODE_ENV=production
        secrets:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PAT }}
```

## 📝 Notes

- 🔒 Ensure your Docker Registry credentials are stored securely as GitHub Secrets
- 🔄 The workflow will automatically handle the Docker build and push process
- 🏷️ You can specify any valid Docker tag format in the `tag` input
- 📅 Consider using dynamic tags based on git tags, commit SHAs, or dates
- 🧪 For testing purposes, you can use the `--dry-run` flag in your own implementation

## 🛠️ Troubleshooting

- If you encounter authentication issues, verify your Docker Registry credentials are correct and have appropriate permissions
- For build failures, check your Dockerfile syntax and ensure all referenced files exist
- Large images may take longer to push - consider optimizing your Dockerfile with multi-stage builds
- If you need to debug the build process, you can add the `ACTIONS_STEP_DEBUG` secret set to `true` in your repository
