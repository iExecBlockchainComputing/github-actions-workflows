# iExec reusable workflow repository

This repository contains a reusable workflow for iExec. It is a monorepo that contains the following components:

## Components

### [Build Docker Image](./workflows/build-docker)
This workflow builds a Docker image from a Dockerfile. It is a reusable workflow that can be used in other workflows.

#### Inputs

- `dockerhub-username`: The username of the Docker Hub account where the image will be pushed.
- `dockerhub-pat`: The password of the Docker Hub account where the image will be pushed.
- `dockerfile`: The path to the Dockerfile that will be used to build the image.
- `image-name`: The name of the image that will be built.