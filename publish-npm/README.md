# NPM Package Publish - Reusable Workflow Documentation 🚀

## Overview 🌟

This reusable GitHub Actions workflow automates the process of publishing an NPM package. It is configurable via inputs for the package scope, Node.js version, registry URL, and other options. The workflow performs the following actions:

- **Checks Out Your Repository**: Retrieves your code. 📥
- **Sets Up Node.js**: Installs the specified Node.js version and configures the `.npmrc` file. ⚙️
- **Installs Dependencies**: Uses `npm ci` to install the dependencies. 📦
- **Publishes the Package**: Publishes the package with provenance (if enabled) and the specified access level using `npm publish`. 🎉

## Workflow Inputs 🛠️

| **Input**         | **Description**                                                                               | **Required** | **Default**                          |
|-------------------|-----------------------------------------------------------------------------------------------|--------------|--------------------------------------|
| **scope**         | Defines the NPM package scope (e.g., `@iexec`).                             | No          | `@iexec`                                    |
| **node-version**  | Specifies the Node.js version to use.                                                         | No           | `20`                                 |
| **registry**      | URL of the NPM registry.                                                                       | No           | `https://registry.npmjs.org`         |
| **access**        | Package access level (public or restricted).                                                 | No           | `public`                             |
| **provenance**    | Enable or disable npm provenance during publishing.                                          | No           | `true`                               |
| **install-command** | Command to install dependencies.                                                           | No           | `npm ci`                             |
| **environment**   | GitHub environment to use for deployment.                                                     | No           | `production`                         |

### Secrets 🔐

| **Secret**    | **Description**                     | **Required** |
|---------------|-------------------------------------|--------------|
| **npm-token** | NPM token for authentication.       | Yes          |

## Job and Steps ⚙️

### Job Name: `build`

- **Runs On**: `ubuntu-latest`.
- **Environment**: Uses the environment specified in `inputs.environment`.
- **Permissions**:
  - `contents: read` – to access repository contents. 🔍
  - `packages: write` – to allow package publication. ✨
  - `id-token: write` – for authentication purposes. 🔑

## How to Use This Reusable Workflow 🔄

1. **Save the Workflow File**  
   Place this YAML file (e.g., `publish-npm.yml`) in the `.github/workflows/` directory of your repository. 💾

2. **Call the Reusable Workflow**  
   In another workflow file (e.g., triggered by a release), invoke this reusable workflow like so:

   ```yaml
   name: Call Publish Package NPM Workflow
   on:
     release:
       types: [published]

   jobs:
     publish:
       uses: your-org/your-repo/.github/workflows/publish-npm.yml@main
       with:
         node-version: '22'
       secrets:
         npm-token: ${{ secrets.NPM_TOKEN }}
   ```

3. **Configure Secrets**  
   Ensure that the `NPM_TOKEN` secret is added to your repository’s settings. This token is required to authenticate with the NPM registry during publishing. 🔑
