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

Workflows are linted with [actionlint](https://github.com/rhysd/actionlint), which also runs [shellcheck](https://github.com/koalaman/shellcheck) on `run:` scripts. Both tools are pinned in `mise.toml` and `mise.lock`. Install them with [mise](https://mise.jdx.dev):

```sh
mise install --locked
```

Then:

```sh
mise run lint
```

CI runs the same command on every pull request and on every push to `main`.
