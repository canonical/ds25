## React Vite Boilerplate

This project provides a template that can be used to quickly create a React Vite
application using the standard set of shared Canonical packages.

#### Running the boilerplate

Run `bun run dev` to run a live development server.

### Live TS checking

[vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker) is used to
include Typescript type checking as a reload & build step.

To disable this, remove `checker()` from `vite.config.ts` and remove the
`vite-plugin-checker` dependency.
You may also remove `skipLibCheck` from `tsconfig.node.json`, as this is used
to ignore type-checking the checker's library dependencies.
