# iExec reusable workflow repository

This repository contains reusable workflows for iExec. It is a monorepo that contains the following components:

## Components

### [Build Docker Image](./docker-build)
This workflow builds a Docker image from a Dockerfile. It is a reusable workflow that can be used in other workflows.

### [Java Build and Test](./java-build)
This workflow builds and tests Java applications with Gradle (default) or Maven. It includes dependency caching and artifact uploading.

### [Release Please](./release-please)
This workflow uses the [release-please-action](https://github.com/googleapis/release-please-action) to automate the release of a project.

### [Publish NPM Package](./publish-npm)
This workflow publishes an NPM package to the NPM registry.
