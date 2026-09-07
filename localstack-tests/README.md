# Localstack Tests - Reusable Workflow Documentation 🚀

## Overview 🌟

This reusable GitHub Actions workflow automates the process of running tests against a local stack environment for Node.js applications. It is configurable via inputs for API keys, Sonar configuration, Node.js version, and other options. The workflow performs the following actions:

- **Sets Up Environment**: Configures the environment with necessary API keys and tokens. 🔑
- **Prepares Node.js**: Installs the specified Node.js version. ⚙️
- **Installs Dependencies**: Uses `npm ci` to install the dependencies. 📦
- **Prepares Local Stack**: Sets up the test environment using `npm run start-test-stack`. 🏗️
- **Builds the Project**: Builds the project using `npm run build`. 🔨
- **Runs Quality Checks**: Performs format checking, linting, and optional type checking. 🧹
- **Installs Globally & Runs Tests**: Installs the package globally and runs tests. ✅
- **Runs Sonar Analysis**: Performs code analysis using SonarQube/SonarCloud. 📊

## Workflow Inputs 🛠️

| **Input**            | **Description**                      | **Required** | **Default** |
|----------------------|--------------------------------------|--------------|-------------|
| **alchemy-api-key**  | API key for Alchemy.                 | Yes          | -           |
| **infura-project-id**| Project ID for Infura.               | Yes          | -           |
| **etherscan-api-key**| API key for Etherscan.               | Yes          | -           |
| **sonar-token**      | Token for SonarCloud/SonarQube.      | Yes          | -           |
| **sonar-host-url**   | URL of Sonar server.                 | Yes          | -           |
| **node-version**     | Node.js version to use.              | No           | `18`        |
| **run-check-types**  | Enable check types.                  | No           | `true`      |

### Environment Variables 🌍

The workflow sets up the following environment variables for the test job:

- `ALCHEMY_API_KEY`: API key for Alchemy services
- `INFURA_PROJECT_ID`: Project ID for Infura services
- `ETHERSCAN_API_KEY`: API key for Etherscan services
- `SONAR_TOKEN`: Authentication token for SonarQube/SonarCloud
- `SONAR_HOST_URL`: URL of the Sonar server

## Job and Steps ⚙️

### Job Name: `test`

- **Runs On**: `ubuntu-latest`
- **Environment Variables**: Sets up API keys and tokens from inputs

#### Steps:

1. **Checkout Repository**: Uses `actions/checkout@v4` to fetch your code. 📥
2. **Setup Node.js**: Configures Node.js with `actions/setup-node@v4` using the specified version. ⚙️
3. **Install Dependencies**: Runs `npm ci` to install dependencies. 📦
4. **Prepare Local Stack**: Executes `npm run start-test-stack` to set up the test environment. 🏗️
5. **Build**: Builds the project using `npm run build`. 🔨
6. **Check Format**: Verifies code formatting using `npm run check-format`. 🧹
7. **Lint**: Performs code linting using `npm run lint`. 🧹
8. **Check Types**: Conditionally runs type checking using `npm run check-types` if enabled. 🔍
9. **Install Global & Test**: Installs the package globally and runs tests. ✅
   - Updates apt packages
   - Installs xxd utility
   - Installs the package globally
   - Runs tests using `npm test`
10. **SonarScanner**: Runs SonarQube/SonarCloud analysis using `SonarSource/sonarqube-scan-action@v5.1.0`. 📊

## How to Use This Reusable Workflow 🔄

1. **Save the Workflow File**  
   This workflow is already saved as `.github/workflows/localstack-tests.yml` in the repository. 💾

2. **Call the Reusable Workflow**  
   In another workflow file (e.g., triggered by a pull request), invoke this reusable workflow like so:

   ```yaml
   name: Run Localstack Tests
   on:
     pull_request:
       branches: [main, develop]

   jobs:
     test:
       uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/localstack-tests.yml@main
       with:
         alchemy-api-key: ${{ secrets.ALCHEMY_API_KEY }}
         infura-project-id: ${{ secrets.INFURA_PROJECT_ID }}
         etherscan-api-key: ${{ secrets.ETHERSCAN_API_KEY }}
         sonar-token: ${{ secrets.SONAR_TOKEN }}
         sonar-host-url: ${{ secrets.SONAR_HOST_URL }}
         node-version: '20'
         run-check-types: true
   ```

3. **Configure Secrets**  
   Ensure that the following secrets are added to your repository's settings:
   - `ALCHEMY_API_KEY`: Your Alchemy API key
   - `INFURA_PROJECT_ID`: Your Infura project ID
   - `ETHERSCAN_API_KEY`: Your Etherscan API key
   - `SONAR_TOKEN`: Your SonarQube/SonarCloud authentication token

## Prerequisites 📋

1. **NPM Scripts**:
   - Your project must have the following npm scripts defined in package.json:
     - `start-test-stack`: Script to set up the local test environment
     - `build`: Script to build the project
     - `check-format`: Script to verify code formatting
     - `lint`: Script to perform code linting
     - `check-types`: Script for type checking (optional, can be disabled)
     - `test`: Script to run tests

2. **Sonar Configuration**:
   - You should have a sonar-project.properties file or equivalent configuration for SonarQube/SonarCloud analysis.

## Workflow Steps in Detail 🔍

1. **Environment Setup**:
   - Sets up environment variables for API keys and tokens.
   - Checks out the repository code.

2. **Node.js Configuration**:
   - Installs the specified Node.js version (default: 18).
   - Prepares the Node.js environment for testing.

3. **Build and Quality Checks**:
   - Installs dependencies using `npm ci`.
   - Prepares the local stack environment.
   - Builds the project.
   - Performs code quality checks (formatting, linting, and optional type checking).

4. **Testing**:
   - Installs the package globally.
   - Runs tests using `npm test`.

5. **Code Analysis**:
   - Runs SonarQube/SonarCloud analysis to evaluate code quality and identify issues.
