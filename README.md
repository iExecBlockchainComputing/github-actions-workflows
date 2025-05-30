# iExec reusable workflow repository

This repository contains a reusable workflow for iExec. It is a monorepo that contains the following components:

## Components

### [Build Docker Image](./docker-build)
This workflow builds a Docker image from a Dockerfile. It is a reusable workflow that can be used in other workflows.

### [Release Please](./release-please)
This workflow uses the [release-please-action](https://github.com/googleapis/release-please-action) to automate the release of a project.

### [Publish NPM Package](./publish-npm)
This workflow publishes an NPM package to the NPM registry.

### [Conventional Commits](./conventional-commits)
This workflow checks that pull request titles follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
