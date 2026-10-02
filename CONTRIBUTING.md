# Contributing

## Editing a reusable workflow

Each shared reusable workflow is backed by a Component directory `<name>/` that release-please versions independently. Release-please only sees changes under `<name>/`, so a commit that only edits the workflow file is otherwise invisible to it.

After editing any `.github/workflows/<name>.yml` for a workflow listed in `release-please-config.json`, run:

```sh
bash scripts/compute-workflow-sha256.sh
```

This regenerates `<name>/workflow-sha256`, a checksum of the workflow file. Commit the resulting diff alongside your workflow change — this is what makes the change visible to release-please for that Component.

CI enforces this on every pull request via `bash scripts/compute-workflow-sha256.sh --check`, which fails if any `workflow-sha256` file is out of date.

## Linting

Workflows are linted with [actionlint](https://github.com/rhysd/actionlint), which also runs [shellcheck](https://github.com/koalaman/shellcheck) on inline `run:` scripts. Shell scripts committed to the repository (`*.sh`, e.g. under `scripts/`) are linted with shellcheck directly. Both tools are pinned in `mise.toml` and `mise.lock`. Install them with [mise](https://mise.jdx.dev):

```sh
mise install --locked
```

Then:

```sh
mise run lint
```

CI runs the same command on every pull request and on every push to `main`.

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
