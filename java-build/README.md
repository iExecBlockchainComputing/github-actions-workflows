# ☕ Java Build Workflow

## 🔍 Overview

This reusable GitHub Actions workflow builds, tests and analyses a Gradle-based Java project.
It is the GitHub Actions counterpart of the `buildJavaProject` Jenkins pipeline used by the iExec middleware
services, and covers the path from a checkout to a jar handed over to an OCI image build.

It serves both services and pure libraries, so anything only a service needs — the Docker Hub login for
Testcontainers, the jar upload — is opt-in and left to the caller.

## ✨ Features

- ☕ Sets up a JDK and Gradle with dependency caching
- 🧪 Runs the unit tests, and optionally an `itest` task
- 🔎 Runs a SonarCloud analysis whose branch and pull request context is auto-detected from the GitHub environment
- 🐳 Optionally logs in to Docker Hub, so Testcontainers-based tests are not hit by anonymous pull rate limits
- 📤 Uploads the built jar as an artifact, ready for `docker-build.yml` to copy into an image
- 📊 Always uploads the Gradle HTML test and coverage reports (`build/reports`), including on failure

## ⚙️ Inputs

| Name                      | Description                                                                                      | Required | Default           |
| ------------------------- | ------------------------------------------------------------------------------------------------ | -------- | ----------------- |
| `artifact-name`           | Name of the uploaded jar artifact                                                                | No       | `"boot-jar"`      |
| `artifact-retention-days` | Retention of the uploaded jar artifact, in days                                                  | No       | `1`               |
| `dockerhub-login`         | Log in to Docker Hub before the build. Enable it when the tests pull images, e.g. Testcontainers | No       | `false`           |
| `java-version`            | Java version to use                                                                              | No       | `"21"`            |
| `refresh-dependencies`    | Run Gradle with `--refresh-dependencies` (only useful for `-SNAPSHOT` or dynamic versions)       | No       | `false`           |
| `run-itest`               | Run the `itest` Gradle task after the unit tests                                                 | No       | `false`           |
| `sonar`                   | Run the SonarQube/SonarCloud analysis                                                            | No       | `false`           |
| `upload-jar`              | Upload the built jar as an artifact, so that a later job can build an OCI image from it          | No       | `false`           |

## 🔐 Secrets

| Name                 | Description                      | Required                     |
| -------------------- | -------------------------------- | ---------------------------- |
| `dockerhub-username` | Docker Hub username              | When `dockerhub-login: true` |
| `dockerhub-password` | Docker Hub token                 | When `dockerhub-login: true` |
| `sonar-token`        | SonarCloud token                 | When `sonar: true`           |

## 📤 Outputs

| Name            | Description                                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jar-path`      | Path of the Gradle project built jar. Feed it to `docker-build.yml` as `build-args: jar=<path>`. Only set when `upload-jar: true`, empty for pure libraries |
| `artifact-name` | Name of the uploaded jar artifact, echoed back for convenience                                                                                              |

## 💻 Example Usage

Building and testing a service, then building an OCI image from the very same jar. `upload-jar` is opt-in
because the workflow also serves pure libraries, which have no image to build and nothing to hand over:

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
      # opt in to the jar upload: only projects that ship an OCI image need it
      upload-jar: true
    secrets:
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

- 🔎 The SonarQube Gradle plugin reads the branch, pull request number and repository from the `GITHUB_*` environment
  variables, so none of the `sonar.pullrequest.*` or `sonar.branch.name` properties need to be passed.
  The `sonar.projectKey` property is derived from SonarQube Gradle plugin and Gradle project properties.
  The `sonar.organization` property (mandatory on SonarQube Cloud) is not auto-detected and derived from the calling repository.
  The checkout uses `fetch-depth: 0` because Sonar attributes lines to authors through `git blame`.
- 🏷️ The checkout also needs the full history because the iExec `build.gradle` files derive the project version
  from the tag pointing at `HEAD`, appending `-NEXT-SNAPSHOT` when there is none.
- 🔄 `refresh-dependencies` defaults to `false`. `setup-gradle` caches the Gradle home between runs — writing it
  from the default branch and restoring it read-only elsewhere — so a build can legitimately resolve against a
  cache populated days earlier. That only matters for changing modules (`-SNAPSHOT`) and dynamic versions, which
  Gradle re-checks at most every 24 hours; enable the input when a project depends on one. For the pinned versions
  the iExec projects resolve from jitpack, it forces Gradle to revalidate the metadata of every module on every
  build for no benefit.
- 📤 The jar artifact is uploaded flat, so `artifact-path: build/libs` in `docker-build.yml` restores it at the
  path reported by the `jar-path` output.
- 🧩 Pure libraries pass `upload-jar: false`: no artifact is uploaded and the `jar-path` output is never set
  (it evaluates to an empty string on the caller side, which is safe to ignore).
- 🔐 The workflow declares `permissions: contents: read` + `actions: write`: the first is needed by `checkout`,
  the second by `upload-artifact`. An explicit `permissions` block resets every other scope to `none`, so dropping
  `actions: write` silently breaks the report artifact.
- 🌐 The `test-reports` artifact (7-day retention) contains the human-readable HTML reports from `build/reports`
  (unit tests, JaCoCo coverage). GitHub does not render HTML inline on a PR: open it from PR → **Checks** → the run
  → **Summary** (bottom *Artifacts* section), download, unzip and open locally. `upload-artifact` also exposes an
  `artifact-url` output if you later want to post a direct download link as a PR comment.

## 🛠️ Troubleshooting

- **`Could not resolve com.github.iExecBlockchainComputing...`** — the dependency is not on jitpack yet. jitpack
  builds a version on first request, so a freshly pushed tag can take a few minutes to become resolvable.
- **`Cannot perform inline analysis, no branch or pull request found`** — the checkout is shallow. This workflow
  sets `fetch-depth: 0`; a caller wrapping it differently has to do the same.
- **`You must define the following mandatory properties ... sonar.organization`** — the SonarQube Cloud organization
  could not be resolved. Either the repository owner is not a SonarQube Cloud organization key, or the project
  lives under a different one. Update the project configuration on SonarQube Cloud.
- **Testcontainers fails pulling an image** — set `dockerhub-login: true` and pass the Docker Hub secrets.
