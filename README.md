# 🚀 iExec Reusable Workflows Repository

This repository contains a comprehensive collection of reusable GitHub Actions workflows for iExec projects. These carefully crafted workflows can be seamlessly integrated into your projects to standardize and automate common CI/CD tasks, saving you time and ensuring consistency across your development pipeline.

## 📋 Available Workflows

### 🐳 [Build Docker Image](./docker-build)
Automates the process of building, tagging, and pushing Docker images to Docker Hub. Perfect for projects that require containerization with minimal configuration overhead.

### ☁️ [Build Docker Image via Docker Build Cloud](./docker-build-cloud)
Builds and pushes a multi-platform Docker image (e.g. `linux/amd64` + `linux/arm64`) to Docker Hub in a single job using Docker Build Cloud's remote builders. No QEMU emulation, no native ARM runners.

### 🚀 [Deploy Docker](./deploy-docker)
Automates the process of building a Docker image and deploying it to a remote server. Configurable for different Dockerfile paths, image names, tags, and remote hosts. Streamlines the deployment process with secure SSH connections.

### 📦 [Release Please](./release-please)
Uses the [release-please-action](https://github.com/googleapis/release-please-action) to automate versioning and changelog generation based on Conventional Commits. This workflow streamlines your release process and ensures consistent version management.

### 📚 [Publish NPM Package](./publish-npm)
Automates the process of publishing NPM packages to the NPM registry with highly configurable options. Simplifies the package publishing workflow while maintaining security and reliability.

### 📝 [Conventional Commits](./conventional-commits)
Validates that pull request titles follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for better repository management. Ensures your commit history remains clean and meaningful for improved collaboration.

### 🦀 [Rust Build](./rust-build)
Provides a standardized workflow for building, testing, and publishing Rust packages with intelligent caching and comprehensive artifact management. Optimized for Rust projects of all sizes.

### 🧹 [Stale Issues and PRs](./stale)
Automatically identifies and closes stale issues and pull requests to maintain a clean and focused repository. Helps your team concentrate on active work items and reduces maintenance overhead.

### 🛡️ [Safe Multisig Transaction Proposer](./propose-safe-multisig-tx)
Automates the process of proposing transactions to a Safe multi-signature wallet (Gnosis Safe). Features smart chain detection, comprehensive validation, and secure transaction handling for blockchain operations.

## 🔧 Usage

Each workflow has its own detailed documentation in its respective directory. The comprehensive documentation includes:
- 📄 Detailed overview of the workflow's purpose and functionality
- 🔒 Required inputs, secrets, and environment variables
- ⚙️ Extensive configuration options with examples
- 💻 Complete example usage with annotations
- 🔍 Troubleshooting tips and best practices

## 💯 Benefits of Using These Workflows

- **🔄 Standardization**: Ensure consistent CI/CD processes across all your projects with battle-tested workflows
- **🛠️ Maintainability**: Centralized workflows make updates and improvements easier to manage, reducing technical debt
- **📋 Reduced Duplication**: Avoid copying and pasting workflow configurations between repositories, eliminating drift and inconsistencies
- **✅ Best Practices**: Implement industry best practices for building, testing, and deploying applications with minimal effort
- **⏱️ Time Savings**: Reduce the time spent configuring and maintaining CI/CD pipelines across multiple projects
- **🔍 Visibility**: Improve transparency and observability of your development processes
- **🚀 Scalability**: Easily scale your CI/CD practices as your organization grows
