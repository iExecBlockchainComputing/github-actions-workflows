# Publish Package NPM - Reusable Workflow Documentation

## Overview

This reusable GitHub Actions workflow automates the process of publishing an NPM package. It is configurable via inputs for the package scope, Node.js version, and registry URL. The workflow performs the following actions:

- Checks out your repository code.
- Sets up Node.js and configures the `.npmrc` file.
- Installs package dependencies using `npm ci`.
- Publishes the package with provenance and public access using `npm publish`.

## Detailed Explanation

### Triggering the Workflow

- **`on: workflow_call`**  
  This setting makes the workflow reusable, allowing it to be invoked by other workflows. Inputs can be passed during the call.

### Workflow Inputs

- **`scope`**
    - **Description:** Defines the NPM package scope (e.g., `@iExecBlockchainComputing`).
    - **Required:** Yes.

- **`node-version`**
    - **Description:** Specifies the version of Node.js to use.
    - **Default:** `20`
    - **Required:** No.

- **`registry-url`**
    - **Description:** URL of the NPM registry.
    - **Default:** `https://registry.npmjs.org`
    - **Required:** No.

### Job and Steps

- **Job Name (`build`):**
    - Runs on `ubuntu-latest`.
    - **Permissions:**
        - `contents: read` – to access repository contents.
        - `packages: write` – to allow package publication.

- **Steps:**
    - **Checkout Repository:**  
      Uses `actions/checkout@v4` to retrieve your code.

    - **Setup Node.js:**  
      Uses `actions/setup-node@v4` to configure Node.js. This step also sets up the `.npmrc` file with the provided registry URL and scope.

    - **Install Dependencies:**  
      Executes `npm ci` to install dependencies from the `package-lock.json` file.

    - **Publish Package:**  
      Executes `npm publish --provenance --access public` to publish the package.
        - The `NODE_AUTH_TOKEN` environment variable is set from `${{ secrets.NPM_TOKEN }}` for authentication.

## How to Use This Reusable Workflow

1. **Save the Workflow File:**  
   Place this YAML file (e.g., `publish-npm.yml`) in the `.github/workflows/` directory of your repository.

2. **Call the Reusable Workflow:**  
   In another workflow file (for example, triggered by a release), invoke this reusable workflow as follows:

   ```yaml
   name: Call Publish Package NPM Workflow
   on:
     release:
       types: [published]

   jobs:
     publish:
       uses: your-org/your-repo/.github/workflows/publish-npm.yml@main
       with:
         scope: '@iExecBlockchainComputing'
         node-version: '20'
         registry-url: 'https://registry.npmjs.org'
       secrets:
         npm-token: ${{ secrets.NPM_TOKEN }}
   ```

3. **Configure Secrets:**  
   Ensure that the `NPM_TOKEN` secret is added to your repository's settings. This token is required to authenticate with the NPM registry during publishing.
