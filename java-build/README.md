# ☕ Java Build Workflow

## 🔍 Overview

This reusable GitHub Actions workflow builds, tests, analyses and publishes a Gradle-based Java project.
It is the GitHub Actions counterpart of the `buildJavaProject` Jenkins pipeline used by the iExec middleware
services, and covers the whole path from a checkout to a jar published on Nexus and handed over to an OCI image build.

Publishing decisions are deliberately left to the caller: this workflow does what it is told, and the caller
expresses the branch and version rules that decide *whether* to publish and *where*.

## ✨ Features

- ☕ Sets up a JDK and Gradle with dependency caching
- 🧪 Runs the unit tests, and optionally an `itest` task
- 🔎 Runs a SonarCloud analysis whose branch and pull request context is auto-detected from the GitHub environment
- 🔐 Feeds private Maven repository credentials to Gradle without leaking them into logs
- 🐳 Optionally logs in to Docker Hub, so Testcontainers-based tests are not hit by anonymous pull rate limits
- 📦 Publishes jar artifacts to a Maven repository chosen by the caller
- 📤 Uploads the built jar as an artifact, ready for `docker-build.yml` to copy into an image
- 📊 Always uploads the JUnit and JaCoCo reports, including on failure

## ⚙️ Inputs

| Name                      | Description                                                                                                      | Required | Default      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| `artifact-name`           | Name of the uploaded jar artifact                                                                                | No       | `"boot-jar"` |
| `artifact-retention-days` | Retention of the uploaded jar artifact, in days                                                                  | No       | `1`          |
| `dockerhub-login`         | Log in to Docker Hub before the build. Enable it when the tests pull images, e.g. Testcontainers                 | No       | `false`      |
| `gradle-build-task`       | Gradle task running the build and the unit tests                                                                 | No       | `"build"`    |
| `java-distribution`       | Java distribution to use (temurin, zulu, corretto, ...)                                                          | No       | `"temurin"`  |
| `java-version`            | Java version to use                                                                                              | No       | `"21"`       |
| `mvn-repository-url  `    | Maven repository the jars are published to, passed to Gradle as `-PmvnRepositoryUrl`                             | When `publish-jars: true` | `""` |
| `publish-jars`            | Publish jar artifacts to a Maven repository                                                                      | No       | `false`      |
| `refresh-dependencies`    | Run Gradle with `--refresh-dependencies`                                                                         | No       | `true`       |
| `run-itest`               | Run the `itest` Gradle task after the unit tests                                                                 | No       | `false`      |
| `runner`                  | GitHub Actions runner label                                                                                      | No       | `"ubuntu-latest"` |
| `sonar`                   | Run the SonarQube/SonarCloud analysis                                                                            | No       | `false`      |
| `upload-jar`              | Upload the built jar as an artifact, so that a later job can build an OCI image from it                          | No       | `false`      |
| `working-directory`       | Directory holding the Gradle wrapper                                                                             | No       | `"."`        |

## 🔐 Secrets

| Name                      | Description                                                                        | Required                                |
| ------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------- |
| `mvn-repository-username` | Username for the private Maven repository, `mvnRepositoryUsername` gradle property | To resolve or publish private artifacts |
| `mvn-repository-password` | Password for the private Maven repository, `mvnRepositoryPassword` gradle property | To resolve or publish private artifacts |
| `dockerhub-username`      | Docker Hub username                                                                | When `dockerhub-login: true`            |
| `dockerhub-password`      | Docker Hub token                                                                   | When `dockerhub-login: true`            |
| `sonar-token`             | SonarCloud token                                                                   | When `sonar: true`                      |

## 📤 Outputs

| Name            | Description                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| `version`       | Gradle project version                                                                                   |
| `jar-path`      | Path of the built jar, relative to the workspace. Feed it to `docker-build.yml` as `build-args: jar=<path>` |
| `artifact-name` | Name of the uploaded jar artifact, echoed back for convenience                                           |

## 💻 Example Usage

Building, testing and publishing a snapshot, then building an OCI image from the very same jar:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  build-and-test:
    # ⚠️ use tagged version here
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/java-build.yml@main
    with:
      java-version: "21"
      sonar: true
      dockerhub-login: true
      publish-jars: ${{ github.ref_name == 'main' }}
      maven-repository-url: https://docker-regis-adm.iex.ec/repository/maven-snapshots/
    secrets:
      nexus-username: ${{ secrets.NEXUS_USERNAME }}
      nexus-password: ${{ secrets.NEXUS_PASSWORD }}
      dockerhub-username: ${{ secrets.DOCKERHUB_USERNAME }}
      dockerhub-password: ${{ secrets.DOCKERHUB_TOKEN_PULL_ONLY }}
      sonar-token: ${{ secrets.SONAR_TOKEN }}

  build-image:
    needs: build-and-test
    # ⚠️ use tagged version here
    uses: iExecBlockchainComputing/github-actions-workflows/.github/workflows/docker-build.yml@main
    with:
      image-name: docker-regis.iex.ec/my-service
      image-tag: dev-${{ github.sha }}
      registry: docker-regis.iex.ec
      push: true
      # the jar built above is downloaded into the build context
      artifact-name: ${{ needs.build-and-test.outputs.artifact-name }}
      artifact-path: build/libs
      build-args: jar=${{ needs.build-and-test.outputs.jar-path }}
    secrets:
      dockerhub-username: ${{ secrets.DOCKERHUB_USERNAME }}
      dockerhub-password: ${{ secrets.DOCKERHUB_TOKEN_PULL_ONLY }}
      username: ${{ secrets.NEXUS_USERNAME }}
      password: ${{ secrets.NEXUS_PASSWORD }}
```

## 📝 Notes

- 🔑 Credentials reach Gradle through the `ORG_GRADLE_PROJECT_nexusUser` and `ORG_GRADLE_PROJECT_nexusPassword`
  environment variables, which map onto the `nexusUser` and `nexusPassword` project properties the iExec
  `build.gradle` files declare. No `gradle.properties` has to be written in CI.
- 🔎 The Sonar Gradle plugin reads the branch, pull request number and repository from the `GITHUB_*` environment
  variables, so none of the `sonar.pullrequest.*` or `sonar.branch.name` properties the Jenkins pipeline computed
  need to be passed. The checkout uses `fetch-depth: 0` because Sonar attributes lines to authors through `git blame`.
- 🏷️ The checkout also needs the full history because the iExec `build.gradle` files derive the project version
  from the tag pointing at `HEAD`, appending `-NEXT-SNAPSHOT` when there is none.
- 🔄 `refresh-dependencies` defaults to `true` to match the Jenkins pipeline. It matters while a project depends on
  `-NEXT-SNAPSHOT` artifacts, which Gradle otherwise considers fresh for 24 hours. Turn it off for projects that
  only depend on released versions, and the dependency cache will do noticeably more work.
- 📦 A Maven registry configured to forbid redeployment will fail the `publish` task when a jar with the same
  group, name and version already exists. That is the intended safety net for released versions, and the reason
  the caller, not this workflow, decides when to publish.
- 📤 The jar artifact is uploaded flat, so `artifact-path: build/libs` in `docker-build.yml` restores it at the
  path reported by the `jar-path` output.

## 🛠️ Troubleshooting

- **`Could not resolve com.iexec...`** — the `nexus-username` and `nexus-password` secrets are missing or wrong;
  they are required to read the private repository, not only to publish to it.
- **`Cannot perform inline analysis, no branch or pull request found`** — the checkout is shallow. This workflow
  sets `fetch-depth: 0`; a caller wrapping it differently has to do the same.
- **Testcontainers fails pulling an image** — set `dockerhub-login: true` and pass the Docker Hub secrets.
- **`Received status code 400 ... redeploy is not allowed`** — the version being published already exists in the
  target repository. Check the caller's publishing condition rather than the repository configuration.
