# Java Build and Test - Reusable Workflow Documentation 🚀

## Overview 🌟

This reusable GitHub Actions workflow automates the process of building and testing Java applications. It supports both Gradle and Maven build tools and is highly configurable via inputs. The workflow performs the following actions:

- **Checks Out Your Repository**: Retrieves your code. 📥
- **Sets Up Java JDK**: Installs the specified Java version and distribution. ☕
- **Sets Up Gradle/Maven**: Configures the specified build tool with the desired version. 🔧
- **Builds Your Application**: Compiles and packages your Java application. 🔨
- **Uploads Build Artifacts**: Optionally uploads the build artifacts for later use. 📦

## Workflow Inputs 🛠️

| **Input**             | **Description**                                                      | **Required** | **Default**       |
|-----------------------|--------------------------------------------------------------------|--------------|-------------------|
| **java-version**      | Java version to use.                                                | No           | `17`              |
| **java-distribution** | Java distribution to use (temurin, zulu, adopt, etc.).             | No           | `temurin`         |
| **build-tool**        | Build tool to use (gradle or maven).                               | No           | `gradle`          |
| **gradle-version**    | Gradle version to use (only applicable if build-tool is gradle).   | No           | `wrapper`         |
| **gradle-build-task** | Gradle build task to run.                                          | No           | `build`           |
| **gradle-build-file** | Gradle build file to use.                                          | No           | `''` (empty string) |
| **maven-version**     | Maven version to use (only applicable if build-tool is maven).     | No           | `3.9.5`           |
| **maven-goals**       | Maven goals to run.                                                | No           | `clean package`   |
| **maven-args**        | Additional Maven arguments.                                        | No           | `''` (empty string) |
| **working-directory** | Working directory where the build commands will be run.            | No           | `.`               |
| **upload-artifacts**  | Whether to upload build artifacts.                                 | No           | `true`            |
| **artifacts-name**    | Name of the artifacts to upload.                                   | No           | `build-artifacts` |
| **artifacts-path**    | Path to the artifacts to upload (relative to working-directory).   | No           | `''` (auto-determined) |

## Job and Steps ⚙️

### Job Name: `build`

- **Runs On**: `ubuntu-latest`.
- **Steps**:
  - **Checkout Repository**: Uses `actions/checkout@v4` to fetch your code. 📥
  - **Set up JDK**: Configures Java with `actions/setup-java@v4`. ☕
  - **Setup Gradle**: If using Gradle, sets up the specified Gradle version. 🔧
  - **Build with Gradle**: If using Gradle, runs the specified build task. 🔨
  - **Setup Maven**: If using Maven, sets up the specified Maven version. 🔧
  - **Build with Maven**: If using Maven, runs the specified goals with arguments. 🔨
  - **Set default artifacts path**: Determines the default artifacts path based on the build tool. 📁
  - **Upload build artifacts**: If enabled, uploads the build artifacts. 📦

## How to Use This Reusable Workflow 🔄

1. **Save the Workflow File**  
   This workflow is already saved as `.github/workflows/java-build.yml` in the repository. 💾

2. **Call the Reusable Workflow**  
   In another workflow file, invoke this reusable workflow like so:

   ```yaml
   name: Build My Java Application
   on:
     push:
       branches: [main]

   jobs:
     build:
       uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/java-build.yml@java-build-v1.0.0
       with:
         java-version: '17'
         build-tool: 'gradle'
         gradle-build-task: 'build'
   ```

## Workflow Steps in Detail 🔍

1. **Checkout Repository**:
   - Uses `actions/checkout@v4` to fetch your code.

2. **Set up JDK**:
   - Uses `actions/setup-java@v4` to install and configure the specified Java version and distribution.
   - Sets the architecture to x64.

3. **Gradle Build** (if build-tool is 'gradle'):
   - Sets up Gradle using `gradle/actions/setup-gradle@v4.0.0`.
   - Runs the specified Gradle build task, using a custom build file if provided.

4. **Maven Build** (if build-tool is 'maven'):
   - Sets up Maven using `stCarolas/setup-maven@v5`.
   - Runs the specified Maven goals with any additional arguments.

5. **Artifact Handling**:
   - If no explicit artifacts path is provided, determines the default path based on the build tool:
     - For Gradle: `build/libs`
     - For Maven: `target`
   - If artifact uploading is enabled, uploads the build artifacts using `actions/upload-artifact@v4`.

## Example Usage Scenarios 📋

### Basic usage with Gradle (default)

```yaml
jobs:
  build:
    uses: iExecBlockchainComputing/github-actions-workflows/java-build@java-build-v1.0.0
```

### Using with Maven

```yaml
jobs:
  build:
    uses: iExecBlockchainComputing/github-actions-workflows/java-build@java-build-v1.0.0
    with:
      build-tool: 'maven'
```

### Custom Java version and distribution

```yaml
jobs:
  build:
    uses: iExecBlockchainComputing/github-actions-workflows/java-build@java-build-v1.0.0
    with:
      java-version: '11'
      java-distribution: 'zulu'
```

### Custom Gradle configuration

```yaml
jobs:
  build:
    uses: iExecBlockchainComputing/github-actions-workflows/java-build@java-build-v1.0.0
    with:
      gradle-build-task: 'test'
      gradle-build-file: 'custom.gradle'
```

### Custom Maven configuration

```yaml
jobs:
  build:
    uses: iExecBlockchainComputing/github-actions-workflows/java-build@java-build-v1.0.0
    with:
      build-tool: 'maven'
      maven-goals: 'clean test'
      maven-args: '-DskipTests=false'
```

### Custom artifacts configuration

```yaml
jobs:
  build:
    uses: iExecBlockchainComputing/github-actions-workflows/java-build@java-build-v1.0.0
    with:
      upload-artifacts: true
      artifacts-name: 'my-java-app'
      artifacts-path: 'custom/path/to/artifacts'
```