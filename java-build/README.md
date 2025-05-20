# Java Build and Test

A reusable GitHub Actions workflow for building and testing Java applications with Gradle or Maven.

## Inputs

### `java-version`

**Optional** The Java version to use. Default: `'17'`.

### `java-distribution`

**Optional** The Java distribution to use (temurin, zulu, adopt, etc.). Default: `'temurin'`.

### `build-tool`

**Optional** The build tool to use (gradle or maven). Default: `'gradle'`.

### `gradle-version`

**Optional** The Gradle version to use (only applicable if build-tool is gradle). Default: `'wrapper'` (uses the Gradle Wrapper).

### `gradle-build-task`

**Optional** The Gradle build task to run. Default: `'build'`.

### `gradle-build-file`

**Optional** The Gradle build file to use. Default: `''` (uses the default build.gradle file).

### `maven-version`

**Optional** The Maven version to use (only applicable if build-tool is maven). Default: `'3.9.5'`.

### `maven-goals`

**Optional** The Maven goals to run. Default: `'clean package'`.

### `maven-args`

**Optional** Additional Maven arguments. Default: `''`.

### `working-directory`

**Optional** The working directory where the build commands will be run. Default: `'.'`.

### `upload-artifacts`

**Optional** Whether to upload build artifacts. Default: `true`.

### `artifacts-name`

**Optional** The name of the artifacts to upload. Default: `'build-artifacts'`.

### `artifacts-path`

**Optional** The path to the artifacts to upload (relative to working-directory). Default: `''` (automatically determined based on build tool).

## Example usage

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