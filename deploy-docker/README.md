# Docker Build & Deploy - Reusable Workflow Documentation 🚀

## Overview 🌟

This reusable GitHub Actions workflow automates the process of building a Docker image and deploying it to a remote server. It is configurable via inputs for the Dockerfile path, image name, tag, remote host, and other options. The workflow performs the following actions:

- **Determines the Tag**: Computes the tag to use for the Docker image. 🏷️
- **Builds the Docker Image**: Builds and pushes the Docker image to DockerHub. 🔨
- **Deploys to Remote Server**: Securely deploys the image to a remote server using SSH. 🚀

## Workflow Inputs 🛠️

| **Input**        | **Description**                                     | **Required** | **Default**     |
|------------------|-----------------------------------------------------|--------------|-----------------|
| **dockerfile**   | Path to Dockerfile.                                 | No           | `Dockerfile`    |
| **image_name**   | Full image name (e.g. org/my-api).                  | Yes          | -               |
| **image_tag**    | Optional tag override (defaults to pushed Git tag). | No           | -               |
| **remote_host**  | SSH host (user@host).                               | Yes          | -               |
| **remote_path**  | Remote path where compose files live.               | Yes          | -               |
| **runner_group** | Runner group or label.                              | No           | `ubuntu-latest` |

### Secrets 🔐

| **Secret**             | **Description**                        | **Required** |
|------------------------|----------------------------------------|--------------|
| **dockerhub_username** | DockerHub username for authentication. | Yes          |
| **dockerhub_password** | DockerHub password for authentication. | Yes          |
| **ssh_private_key**    | SSH private key for remote deployment. | Yes          |

### Outputs 📤

| **Output** | **Description**                | **Value**                         |
|------------|--------------------------------|-----------------------------------|
| **tag**    | Tag effectively built/deployed | `${{ jobs.get-tag.outputs.tag }}` |

## Jobs and Steps ⚙️

### Job: `get-tag`
- **Purpose**: Determines the tag to use for the Docker image.
- **Runs On**: The specified runner group (default: `ubuntu-latest`).
- **Steps**:
  1. Checkout the repository.
  2. Compute the tag (uses the provided tag or extracts it from the Git reference).

### Job: `build`
- **Purpose**: Builds and pushes the Docker image.
- **Depends On**: `get-tag`
- **Uses**: The docker-build workflow from the same repository.
- **Inputs**:
  - Dockerfile path
  - Image name and tag
  - Push configuration (set to true)

### Job: `deploy`
- **Purpose**: Deploys the Docker image to a remote server.
- **Depends On**: `build` and `get-tag`
- **Runs On**: The specified runner group.
- **Steps**:
  1. Checkout the repository.
  2. Install SSH key for secure connection.
  3. Add remote host to known_hosts.
  4. Prepare .env file for Docker Compose.
  5. Copy compose files to the remote server.
  6. Pull and restart containers on the remote server.

## How to Use This Reusable Workflow 🔄

1. **Save the Workflow File**  
   This workflow is already saved as `.github/workflows/deploy-docker.yml` in the repository. 💾

2. **Call the Reusable Workflow**  
   In another workflow file (e.g., triggered by a release), invoke this reusable workflow like so:

   ```yaml
   name: Deploy My Docker Application
   on:
     release:
       types: [published]

   jobs:
     deploy:
       uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/deploy-docker.yml@main
       with:
         dockerfile: 'path/to/Dockerfile'
         image_name: 'your-org/your-app'
         remote_host: 'user@your-server.com'
         remote_path: '/path/to/deployment'
       secrets:
         dockerhub_username: ${{ secrets.DOCKERHUB_USERNAME }}
         dockerhub_password: ${{ secrets.DOCKERHUB_PASSWORD }}
         ssh_private_key: ${{ secrets.SSH_PRIVATE_KEY }}
   ```

3. **Configure Secrets**  
   Ensure that the following secrets are added to your repository's settings:
   - `DOCKERHUB_USERNAME`: Your DockerHub username
   - `DOCKERHUB_PASSWORD`: Your DockerHub password or access token
   - `SSH_PRIVATE_KEY`: The SSH private key for connecting to the remote server

## Prerequisites 📋

1. **Docker Compose File**:
   - You must have a `docker-compose.yml` file in the root of your repository.
   - This file should reference the environment variables `IMAGE_NAME` and `IMAGE_TAG`.

2. **Remote Server**:
   - The remote server must have Docker and Docker Compose installed.
   - The user specified in `remote_host` must have permissions to run Docker commands.

## Workflow Steps in Detail 🔍

1. **Get Tag**:
   - Checks out the repository.
   - Computes the tag to use (either from the input or from the Git reference).

2. **Build Docker Image**:
   - Uses the docker-build workflow to build and push the Docker image.
   - Configures the image with the computed tag.

3. **Deploy to Remote Server**:
   - Sets up SSH authentication.
   - Prepares the environment variables file.
   - Copies the necessary files to the remote server.
   - Pulls the latest image and restarts the containers using Docker Compose.