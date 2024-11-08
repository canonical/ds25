# DS-25 - Canonical's new design system

Canonical's new design system.
This is the successor to [Vanilla framework](https://vanillaframework.io).

## Getting started

1. Install [NodeJS](https://nodejs.org/en/download/package-manager) version 20 or later.
2. Install the [bun package manager](https://bun.sh/).
3. Install Node dependencies: `bun install`.

The monorepo's dependencies should now be installed.

### Binary bun lockfile

Bun's lockfile (`bun.lockb`) is currently binary.
This can cause issues with resolving git conflicts when switching branches or pulling changes from remote.

You can mitigate this issue locally by configuring your
git client to read Bun lockfiles as text: `git config diff.lockb.textconv bun && git config diff.lockb.binary true`.

This will no longer be necessary once Bun [switches to a text-based lockfile](https://github.com/oven-sh/bun/issues/11863).

## Structure

The design system is structured as a [monorepo](https://semaphoreci.com/blog/what-is-monorepo).
It contains many sub-packages for applications, configurations, and other packages.

The monorepo should not be considered to be a single project that is run as a whole.
Each of its packages are separate modules that can be worked on independently.

- `apps/`: Core applications consuming the design system. These could be documentation sites, boilerplates, etc.
- `configs/`: Recommended configurations for linters, build tools, etc.
- `packages/`: Modules that consume configurations and are consumed by applications.
  - [`packages/ds-react-core`](/packages/ds-react-core/README.md) is especially noteworthy as it publishes our styling and React components, and documents them with [Storybook](https://storybook.js.org/).

## Package scripts

We currently use Lerna to run package scripts across all packages in the monorepo.
This enables us to run tasks for all packages, taking advantage of concurrency
and task result caching.

Generally, you will be working on a small number of packages at a time,
so we recommend switching to the directory of whatever package you are working
on and running the appropriate scripts (`bun run check`, for example) on a
per-package basis.

In cases where running tasks across the entire monorepo is necessary,
`lerna run` should be used. For example, the command `lerna run build`
will run the `build` script specified in the `scripts` of each `package.json`
in the monorepo.

### Recommended package scripts

Each package should define the following scripts in `package.json`:

- `build`: Builds the package as preparation for publishing or use by its dependencies.
- `check`: Lints and type-checks the package.
- `check:fix`: Lints and type-checks the package, and applies fixes where possible.

By creating these scripts in each package, the build and check tasks will be
included in the monorepo's CI workflow, helping to avoid build errors later.
