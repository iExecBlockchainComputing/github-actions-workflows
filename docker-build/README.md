# 🐳 Docker Build Workflow

## 🔍 Overview

This reusable GitHub Actions workflow automates the process of building and pushing Docker images to Docker Hub. It simplifies the Docker build process in your CI/CD pipeline by handling authentication, building, and tagging in a standardized way. Perfect for teams looking to streamline their containerization workflow with minimal configuration.

## ✨ Features

- 🔐 Securely authenticates with Docker Hub using best practices
- 🏗️ Builds optimized Docker images from a specified Dockerfile
- 🏷️ Intelligently tags and pushes images to Docker Hub
- 🛡️ Handles authentication securely using GitHub Secrets
- 🚀 Optimizes build performance with layer caching
- 📦 Supports multi-platform builds (AMD64, ARM64)

## ⚙️ Inputs

| Name         | Description                                                                   | Required | Default        |
| ------------ | ----------------------------------------------------------------------------- | -------- | -------------- |
| `image-name` | Name of Docker Image (e.g., 'myimage', 'myorg/myimage')                       | true     | -              |
| `image-tag`  | Tag to apply to the built image (e.g., 'latest', 'v1.2.3')                    | No       | `"latest"`     |
| `dockerfile` | Path to the Dockerfile to build (e.g., './Dockerfile', './docker/Dockerfile') | No       | `"Dockerfile"` |
| `push`       | Push Docker Image to Registry                                                 | No       | `false`        |

## 🔐 Secrets

| Name                 | Description                                                                        | Required |
| -------------------- | ---------------------------------------------------------------------------------- | -------- |
| `dockerhub_username` | Username for Docker Hub authentication                                             | Yes      |
| `dockerhub_pat`      | Personal Access Token for Docker Hub authentication (with appropriate permissions) | Yes      |

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
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Fetch all history for proper versioning

      - name: Build and Push Docker Image
        uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/docker-build.yml@docker-build-v2.2.0
        with:
          image-name: "username/my-image"
          dockerfile: "Dockerfile"
        secrets:
          dockerhub_username: ${{ secrets.DOCKERHUB_USERNAME }}
          dockerhub_pat: ${{ secrets.DOCKERHUB_PAT }}
```

## 🔍 Advanced Usage

### Multi-Platform Build Example

```yaml
name: Build Multi-Platform Docker Image

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Build and Push Docker Image
        uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/docker-build.yml@docker-build-v2.2.0
        with:
          dockerfile: "Dockerfile"
          tag: "myorg/myapp:${{ github.event.release.tag_name }}"
        secrets:
          dockerhub_username: ${{ secrets.DOCKERHUB_USERNAME }}
          dockerhub_pat: ${{ secrets.DOCKERHUB_PAT }}
```

## 📝 Notes

- 🔒 Ensure your Docker Hub credentials are stored securely as GitHub Secrets
- 🔄 The workflow will automatically handle the Docker build and push process
- 🏷️ You can specify any valid Docker tag format in the `tag` input
- 📅 Consider using dynamic tags based on git tags, commit SHAs, or dates
- 🧪 For testing purposes, you can use the `--dry-run` flag in your own implementation

## 🛠️ Troubleshooting

- If you encounter authentication issues, verify your Docker Hub credentials are correct and have appropriate permissions
- For build failures, check your Dockerfile syntax and ensure all referenced files exist
- Large images may take longer to push - consider optimizing your Dockerfile with multi-stage builds
- If you need to debug the build process, you can add the `ACTIONS_STEP_DEBUG` secret set to `true` in your repository
