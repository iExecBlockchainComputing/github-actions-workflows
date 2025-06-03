# 🧹 Stale

📝 This workflow marks and closes stale issues and pull requests that have had no activity for a specified period of time.

## 📋 Example Usage

```yaml
name: Mark stale issues and pull requests

on:
  schedule:
    - cron: '0 0 * * *'  # Run daily at midnight

jobs:
  stale:
    uses: iExecBlockchainComputing/github-actions-workflows/stale.yml@stale-v1.0.0
```

## ⚙️ Default Configuration

This workflow uses GitHub's built-in stale action with the following default settings:

- Issues and pull requests with no activity for 60 days are marked as stale
- Stale issues and pull requests are closed after 7 days of inactivity
- Issues with the "pinned" label are never marked as stale
- A comment is posted when an issue or pull request is marked as stale

For more information, see the [GitHub documentation on the stale action](https://github.com/actions/stale).
