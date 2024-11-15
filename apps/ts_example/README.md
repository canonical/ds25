## TS Example

A simple example of using TS and Biome in a Typescript app.

## Caveats
### TSConfig
#### `lib` override

Some functions in this example (such as `setTimeout`) require the DOM API.
Therefore, this package includes the DOM lib, which is not included by the base Typescript config.