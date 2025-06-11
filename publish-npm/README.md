# NPM Package Publish - Reusable Workflow Documentation 🚀

## Overview 🌟

This reusable GitHub Actions workflow automates the process of publishing an NPM package. It is configurable via inputs
for the package scope, Node.js version, registry URL, and other options. The workflow performs the following actions:

- **Checks Out Your Repository**: Retrieves your code. 📥
- **Sets Up Node.js**: Installs the specified Node.js version and configures the `.npmrc` file. ⚙️
- **Installs Dependencies**: Uses the specified install command (default: `npm ci`) to install the dependencies. 📦
- **Runs Tests**: Executes unit tests if present. ✅
- **Performs Type Checking**: Runs type checking if configured. 🔍
- **Publishes the Package**: Publishes the package with provenance (if enabled) and the specified access level using
  `npm publish`. 🎉

## Workflow Inputs 🛠️

| **Input**              | **Description**                          | **Required** | **Default**                       |
|------------------------|------------------------------------------|--------------|-----------------------------------|
| **scope**              | NPM package scope (e.g., `@iexec`).      | No           | `@iexec`                          |
| **node-version**       | Node.js version to use.                  | No           | `20`                              |
| **registry**           | NPM registry URL.                        | No           | `https://registry.npmjs.org`      |
| **access**             | Package access (public or restricted).   | No           | `public`                          |
| **provenance**         | Enable npm provenance.                   | No           | `true`                            |
| **install-command**    | Install dependencies command.            | No           | `npm ci`                          |
| **test-command**       | Run unit tests command.                  | No           | `npm test --if-present`           |
| **type-check-command** | Run type-checking command.               | No           | `npm run type-check --if-present` |
| **environment**        | GitHub environment.                      | No           | `production`                      |
| **tag**                | npm publish tag (e.g., latest, nightly). | No           | `''` (empty string)               |
| **tag-prefix**         | Prefix for Git tag.                      | No           | `v`                               |
| **working-directory**  | Directory containing package.json.       | No           | `''` (empty string)               |

### Secrets 🔐

| **Secret**    | **Description** | **Required** |
|---------------|-----------------|--------------|
| **npm-token** | NPM auth token. | Yes          |

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
         test-command: 'npm run test:ci'
         type-check-command: 'npm run type-check'
         tag-prefix: 'v'
       secrets:
         npm-token: ${{ secrets.NPM_TOKEN }}
   ```

3. **Configure Secrets**  
   Ensure that the `NPM_TOKEN` secret is added to your repository’s settings. This token is required to authenticate
   with the NPM registry during publishing. 🔑

## Workflow Steps in Detail 🔍

1. **Checkout Repository**: Uses `actions/checkout@v4` to fetch your code.
2. **Setup Node.js**: Configures Node.js with `actions/setup-node@v4`, including npm cache.
3. **Install Dependencies**: Runs the specified install command (default: `npm ci`).
4. **Run Unit Tests**: Executes tests using the specified test command (default: `npm test --if-present`).
5. **Run Type Checks**: Performs type checking using the specified command (default: `npm run type-check --if-present`).
6. **Publish Package**: Publishes the package to the NPM registry with the specified configuration.
