# Mirror Branch action

Want to rename a branch? Want to rename it right now, but worried that it will break things that are pulling from its current name (e.g. CI jobs)?

Have you already renamed a branch and broken everything and you want to fix it ASAP?

This action updates another branch whenever you push to the branch it's triggered on. It should serve as a handy stopgap while you track down those last few jobs that are still set to the old name.

## Inputs

### `target-branch`

The name of the branch to update. Default `"master"`.

### `force`

Whether or not to force push. "true" means to force push, "false" means don't. Defaults to true.

## Example usage

Mirror the `release-candidate` branch to the `master` branch:

```
name: Mirror branch

on:
  push:
    branches: [ release-candidate ]

jobs:
  mirror-to-master:
    runs-on: ubuntu-latest
    steps:
    - uses: zofrex/mirror-branch@v1
```

Mirror the `release` branch to the `deployment` branch, but don't force push:

```
name: Mirror branch

on:
  push:
    branches: [ release ]

jobs:
  mirror-to-master:
    runs-on: ubuntu-latest
    steps:
    - uses: zofrex/mirror-branch@v1
      with:
        target-branch: deployment
```

Note that the source branch to copy from is not an option for this action, so you should limit it to only run on one branch, unless you're absolutely certain that you want to mirror multiple branches to one target.
