# Contributing

## Verifying your changes

All dev tools are pinned in `mise.toml` and `mise.lock`. Install them with [mise](https://mise.jdx.dev):

```sh
mise install --locked
```

Then, before pushing, run:

```sh
mise run verify-all
```

CI runs the same command on every pull request and on every push to `main`. It runs these tasks:

- `lint`: runs all linters (see [Linting](#linting))
  - `lint:format`: checks formatting with Prettier
  - `lint:actionlint`: lints GitHub Actions workflows with actionlint
  - `lint:shellcheck`: lints shell scripts with shellcheck
- `check-checksums`: checks that `workflow-sha256` files match their workflows (see [Editing a reusable workflow](#editing-a-reusable-workflow))
- `check-release-please-config`: validates `release-please-config.json`, checking that every package declares a component and that keys are ordered

You can run any of these on its own, e.g. `mise run lint:shellcheck`. Run `mise tasks` to list all tasks.

## Editing a reusable workflow

Each shared reusable workflow is backed by a Component directory `<name>/` that release-please versions independently. Release-please only sees changes under `<name>/`, so a commit that only edits the workflow file is otherwise invisible to it.

After editing any `.github/workflows/<name>.yml` for a workflow listed in `release-please-config.json`, run:

```sh
mise run update-checksums
```

This formats the repository (see [Formatting](#formatting)), then runs `scripts/compute-workflow-sha256.sh`, which regenerates `<name>/workflow-sha256`, a checksum of the workflow file. Commit the resulting diff alongside your workflow change — this is what makes the change visible to release-please for that Component.

`mise run verify-all` enforces this through the `check-checksums` task, which fails if any `workflow-sha256` file is out of date.

## Formatting

Files are formatted with [Prettier](https://prettier.io), using its default settings. Generated files (release-please changelogs, mise files) are excluded via `.prettierignore`. Format the repository with:

```sh
mise run format
```

> [!IMPORTANT] Formatting can rewrite workflow files, which changes their checksum. After editing a workflow, run `mise run update-checksums` instead of `mise run format` alone, so `workflow-sha256` files are computed from the formatted content.

## Linting

Workflows are linted with [actionlint](https://github.com/rhysd/actionlint), which also runs [shellcheck](https://github.com/koalaman/shellcheck) on inline `run:` scripts. Shell scripts committed to the repository (`*.sh`, e.g. under `scripts/`) are linted with shellcheck directly. Formatting is checked with `prettier --check`. Run all linters with:

```sh
mise run lint
```

`mise run verify-all` includes this step.

## Updating dependencies

Keep dependencies fresh opportunistically: whenever you work on something, check its dependencies and apply the updates that don't break the build in the same pull request. Updates that need more work belong in a dedicated pull request.

Only adopt a release once it has been published for at least 7 days. This cooldown leaves time for broken or compromised releases to be caught before they land here, so don't work around it. Only mise enforces it, for dev tools. For everything else, such as workflow actions, check the release date yourself.

### Workflow actions

Every `uses:` reference to an action or reusable workflow is pinned to a full commit SHA, followed by a comment with the version it resolves to:

```yaml
uses: actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803 # v6.1.0
```

When you work on a workflow, check its `uses:` references for newer releases that are at least 7 days old. To bump one, update the SHA and the version comment together, and make sure the SHA is the commit the release tag points to.

### Dev tools

Dev tools (e.g. actionlint, shellcheck, ...) are managed with [mise](https://mise.jdx.dev). Their configuration is committed: `mise.toml`, `mise.lock` and anything under `.mise/`. Upgrade them with:

```sh
mise upgrade --bump
```

This bumps the versions in `mise.toml` and refreshes `mise.lock` along with its sidecar files under `.mise/`. Commit all of them.

mise enforces the 7-day cooldown through `minimum_release_age = "7d"` in `mise.toml`.

When you work on the repository, run `mise outdated --bump` to check the dev tools.
