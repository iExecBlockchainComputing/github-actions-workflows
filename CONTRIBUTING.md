# Contributing

## Editing a reusable workflow

Each reusable workflow (`.github/workflows/<name>.yml` declaring `workflow_call:`) is backed by a Component directory `<name>/` that release-please versions independently. Release-please only sees changes under `<name>/`, so a commit that only edits the workflow file is otherwise invisible to it.

After editing any `.github/workflows/<name>.yml` for one of the 8 reusable workflows, run:

```sh
scripts/compute-workflow-sha256.sh
```

This regenerates `<name>/workflow-sha256`, a checksum of the workflow file. Commit the resulting diff alongside your workflow change — this is what makes the change visible to release-please for that Component.

CI enforces this on every pull request via `scripts/compute-workflow-sha256.sh --check`, which fails if any `workflow-sha256` file is out of date.
