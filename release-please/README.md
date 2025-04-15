# 🚀 Release Please Reusable Workflows

This documentation explains how to configure and use the reusable **release-please** workflow in your projects. For further details on **release-please**, please refer to the [release-please GitHub page](https://github.com/googleapis/release-please).

## 1. Configuration Files

### 1.1. release-please-config.json

This file, placed at the root of your project, defines the schema, customizes the changelog sections, and sets the release type rules for your package(s). For example, in a Node.js project:

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "changelog-sections": [
    { "type": "feat", "section": "🚀 Features", "hidden": false },
    { "type": "change", "section": "🚀 Features", "hidden": false },
    { "type": "deprecate", "section": "⚠️ Changes", "hidden": false },
    { "type": "remove", "section": "⚠️ Changes", "hidden": false },
    { "type": "fix", "section": "🐞 Bug Fixes", "hidden": false },
    { "type": "revert", "section": "🐞 Bug Fixes", "hidden": false },
    { "type": "security", "section": "🐞 Bug Fixes", "hidden": false },
    { "type": "perf", "section": "✨ Polish", "hidden": false },
    { "type": "refactor", "section": "✨ Polish", "hidden": false },
    { "type": "style", "section": "✨ Polish", "hidden": false },
    { "type": "build", "section": "🧰 Other", "hidden": false },
    { "type": "chore", "section": "🧰 Other", "hidden": false },
    { "type": "deps", "section": "🧰 Other", "hidden": true },
    { "type": "ci", "section": "🧰 Other", "hidden": true },
    { "type": "test", "section": "🧪 Tests", "hidden": false },
    { "type": "docs", "section": "📚 Documentation", "hidden": true }
  ],
  "packages": {
    ".": {
      "release-type": "node",
      "changelog-path": "CHANGELOG.md"
    }
  }
}
```

### 1.2. .release-please-manifest.json

This file tracks the published versions by **release-please**. You can start with it empty if your project has no version yet, or pre-fill it with versions if necessary.

*Empty initialization:*

```json
{}
```

*Or with predefined versions:*

```json
{
  "packages": {
    ".": {
      "version": "1.0.0"
    }
  }
}
```

## 2. ⚙️ Usage in Your Repository

Place the following YAML file (e.g., `.github/workflows/release.yml`) in your repository to directly call the reusable workflow. It triggers the workflow on a push to the `main` branch, applies the necessary permissions, and inherits secrets.

```yaml
on:
  push:
    branches:
      - main

permissions:
  contents: write
  issues: write
  pull-requests: write

name: release-please

jobs:
  release-please:
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/release-please.yml@release-please-v2.0.0
    secrets: inherit
```

## 3. Release Types

**release-please** supports different release types tailored for various ecosystems and languages via the `release-type` parameter in the configuration file. Here are some of the common ones:

- **node**  
  For Node.js projects, it automatically manages changelogs and bump versions following semver conventions.

- **java**  
  For Java projects, applying specific rules for Maven, Gradle, and other build tools.

- **python**  
  For Python projects, it follows versioning conventions commonly used in the Python ecosystem.

- **ruby**, **go**, **dotnet**  
  Additional types are available based on the nature of your project.

> For more detailed information on each release type and additional configuration options, please visit the [release-please documentation](https://github.com/googleapis/release-please?tab=readme-ov-file#strategy-language-types-supported).

## 4. Use Cases: Single Project vs. Monorepo

### 4.1. Single Project

For a single project, the entire configuration and version tracking are managed for one package:

- **Configuration:**  
  The `release-please-config.json` file contains the global settings, and the `.release-please-manifest.json` file tracks the unique version.

- **Workflow:**  
  The YAML file located in `.github/workflows/release.yml` triggers the release process for the entire project.

### 4.2. Monorepo (Multiple Projects)

For a monorepo containing several projects, the configuration allows you to manage each package independently:

- **Configuration:**  
  In the `release-please-config.json` file, you can define multiple packages under the `"packages"` key. For example, if your monorepo contains a primary package and a subproject named `subproject`:

  ```json
  {
    "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
    "changelog-sections": [
      { "type": "feat", "section": "🚀 Features", "hidden": false },
      { "type": "fix", "section": "🐞 Bug Fixes", "hidden": false },
      { "type": "docs", "section": "📚 Documentation", "hidden": true },
      ...
    ],
    "packages": {
      ".": {
        "release-type": "node",
        "changelog-path": "CHANGELOG.md"
      },
      "subproject": {
        "release-type": "node",
        "changelog-path": "subproject/CHANGELOG.md"
      }
    }
  }
  ```

- **Manifest:**  
  The `.release-please-manifest.json` file can maintain separate entries for each package:

  ```json
  {
    "packages": {
      ".": {
        "version": "1.0.0"
      },
      "subproject": {
        "version": "0.9.0"
      }
    }
  }
  ```

- **Workflow:**  
  The YAML workflow file remains the same, triggering the release process for all defined packages according to the configuration.

This documentation helps you automate and centralize your release process effectively, leveraging the flexibility provided by **release-please**. Feel free to adapt these examples to your specific requirements and consult the [official documentation](https://github.com/googleapis/release-please) for more options and details!