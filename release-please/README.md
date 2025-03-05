# Release please reusable workflows

This is the reusable workflow for release any project.

## Secrets

### application_id

**Required** The application id to use to log app in to GitHub.

### private_key

**Required** The private key to use to log app in to GitHub.


## Example usage

```yaml
uses: iExecBlockchainComputing/github-actions-workflows/release-please@release-please-v1.0.0
secrets: 
  application_id: ${{ secrets.application_id }}
  private_key: ${{ secrets.private_key }}
```