# Conventional Commits

This workflow checks that pull request titles follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Secrets

### `GITHUB_TOKEN`

**Required** The GitHub token to use for authentication.

## Example usage

```yaml
name: Lint PR Title

on:
  pull_request_target:
    types:
      - opened
      - edited
      - reopened

jobs:
  lint-pr-title:
    permissions:
      pull-requests: read
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/conventional-commits.yml@conventional-commits-v1.0.1
```
