# Docker build

## Inputs

### `dockerfile`

**Required** The path to the Dockerfile to build.

### `tag`

**Required** The tag to apply to the built image.

## Secrets

### `dockerhub_username`

**Required** The username to use to log in to Docker Hub.

### `dockerhub_pat`

**Required** The personal access token to use to log in to Docker Hub.

## Example usage

```yaml
uses: iExecBlockchainComputing/github-actions-workflows/docker-build@docker-build-v1.1.1
with:
  dockerfile: 'Dockerfile'
  tag: 'my-image:latest'
secrets: 
  dockerhub_username: ${{ secrets.dockerhub_username }}
  dockerhub_pat: ${{ secrets.dokerhub_pat }}
```
