# 🧹 Stale Issues and PRs Workflow

## 🔍 Overview
This reusable GitHub Actions workflow automatically identifies and closes stale issues and pull requests. It helps maintain a clean, focused repository by addressing inactive contributions that might otherwise be forgotten. By automating this maintenance task, your team can concentrate on active development while ensuring nothing falls through the cracks.

## ✨ Features
- 🏷️ Automatically marks issues as stale after a configurable period of inactivity
- 📝 Automatically marks pull requests as stale after a configurable period of inactivity
- 🔄 Closes stale issues and PRs if no activity occurs after being marked as stale
- 🔖 Adds a "stale" label to identified items for easy filtering and visibility
- 💬 Adds customizable messages to stale items to guide contributors
- ⏱️ Different timeframes for issues vs. pull requests to match workflow needs
- 🔍 Exempt specific issues/PRs with labels like "no-stale" or "pinned"

## ⚙️ Default Configuration
The workflow uses the following carefully tuned default settings:

| Setting | Issues | Pull Requests |
|---------|--------|---------------|
| Days before marking as stale | 30 | 60 |
| Days before closing after being marked stale | 7 | 14 |
| Label applied | "stale" | "stale" |
| Message | "This issue has been automatically marked as stale due to inactivity." | "This pull request has been automatically marked as stale due to inactivity." |

## 🛡️ Permissions
The workflow requires the following permissions:
- `issues: write` - To label and close stale issues
- `pull-requests: write` - To label and close stale pull requests

## 💻 Example Usage

```yaml
name: Handle Stale Issues and PRs

on:
  schedule:
    - cron: '0 0 * * *'  # Run daily at midnight

jobs:
  stale:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/stale.yml@stale-v1.0.0
```

## 🔧 Advanced Configuration Example

```yaml
name: Custom Stale Management

on:
  schedule:
    - cron: '30 1 * * *'  # Run at 1:30 AM daily

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          # Custom configuration for issues
          days-before-issue-stale: 45
          days-before-issue-close: 10
          stale-issue-label: 'inactive'
          stale-issue-message: 'This issue has been marked as inactive due to 45 days of no activity.'
          close-issue-message: 'This issue has been closed due to continued inactivity. Please reopen if needed.'

          # Custom configuration for PRs
          days-before-pr-stale: 30
          days-before-pr-close: 7
          stale-pr-label: 'stale-pr'
          stale-pr-message: 'This PR has been inactive for 30 days and is marked as stale.'

          # Exempt certain issues/PRs
          exempt-issue-labels: 'pinned,security,bug'
          exempt-pr-labels: 'wip,reviewing'

          # Limit operations
          operations-per-run: 100
```

## 🛠️ Customization
This workflow uses the [actions/stale](https://github.com/actions/stale) action internally. If you need to customize the behavior beyond the default settings, you can create your own workflow that directly uses the actions/stale action with your preferred configuration as shown in the advanced example above.

## 🌟 Benefits
- 🧼 Reduces repository clutter by automatically managing inactive items
- 🚀 Encourages active participation and follow-up from contributors
- 🤖 Automatically manages abandoned issues and PRs without manual intervention
- 🎯 Helps maintainers focus on active contributions rather than stale work
- 📊 Improves project metrics by reflecting actual active work
- ⏳ Saves maintainer time by automating routine repository maintenance
- 🔄 Creates a continuous feedback loop for contributors

## 📋 Best Practices
- Consider announcing your stale policy in your contributing guidelines
- Review closed items periodically to ensure important issues weren't closed prematurely
- Adjust timeframes based on your project's activity level and contributor base
- Use exempt labels for long-term issues that shouldn't be closed automatically
