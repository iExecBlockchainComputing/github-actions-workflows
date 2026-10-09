# 📝 Conventional Commits Workflow

## 🔍 Overview

This reusable GitHub Actions workflow validates that pull request titles follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Conventional Commits provide a standardized format for commit messages, making it easier to generate changelogs, automate versioning, and understand the purpose of changes at a glance. By enforcing this standard, your repository maintains a clean and meaningful history that benefits both developers and automated tools.

## 📚 What are Conventional Commits?

Conventional Commits follow this structured format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 🏷️ Common Types Include:

- `✨ feat`: A new feature that adds functionality to your codebase
- `🐛 fix`: A bug fix that resolves an issue or problem
- `📖 docs`: Documentation changes or improvements
- `💅 style`: Changes that don't affect code meaning (formatting, white-space, etc.)
- `♻️ refactor`: Code changes that neither fix bugs nor add features but improve structure
- `🧪 test`: Adding or correcting tests to ensure code quality
- `🔧 chore`: Changes to the build process, dependencies, or auxiliary tools
- `⚡ perf`: Performance improvements that make your code faster
- `🔒 security`: Fixing security vulnerabilities or enhancing security

## 🌟 Benefits

- **📋 Automated Changelog Generation**: Works seamlessly with tools like release-please to create detailed, organized changelogs without manual effort
- **🔢 Semantic Versioning Automation**: Helps determine version bumps based on commit types (major, minor, patch) following SemVer principles
- **📊 Improved Repository History**: Makes your project history more readable, structured, and navigable for all team members
- **👥 Better Collaboration**: Provides clear context for code reviewers, making the review process more efficient
- **🔄 Consistent Communication**: Establishes a common language for discussing changes across your team
- **🤖 CI/CD Integration**: Enables automated workflows based on commit types for more sophisticated pipelines

## ⚙️ Workflow Details

### 🔐 Secrets

| Name | Description | Required |
| --- | --- | --- |
| `GITHUB_TOKEN` | GitHub token for authentication and PR interactions | Yes |

### 🛡️ Permissions

The workflow requires `pull-requests: read` permission to access PR information and validate titles effectively.

## 💻 Example Usage

```yaml
name: Lint PR Title

on:
  pull_request:
    types:
      - opened
      - edited
      - reopened
      - synchronize

jobs:
  lint-pr-title:
    permissions:
      pull-requests: read
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/conventional-commits.yml@conventional-commits-v1.0.1
```

## 📋 Implementation Notes

- 🔄 The workflow runs automatically when PRs are opened, edited, or reopened to ensure continuous validation
- ✅ It validates the PR title against the Conventional Commits specification with comprehensive checks
- 💬 If validation fails, the workflow writes detailed guidance on how to fix the title to the job summary
- 🔗 This workflow is particularly useful when combined with the release-please workflow for a fully automated release process
- 🚀 Helps maintain a high-quality repository that's ready for automated versioning and changelog generation

## 🛠️ Troubleshooting

- If PR titles are consistently failing validation, consider providing team training on Conventional Commits
- For complex projects, you may want to define custom scopes that align with your project's architecture
- Remember that only the PR title needs to follow the convention, not every commit message (though that's also beneficial)
