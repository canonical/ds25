## FE - File Export

### FE.01 : Default and named exports Usage

Files have either **one default export** or **multiple named exports**. The name of the file and its domain should hint at the type of exports that are provided. 

| File | Exports | Rationale | 
| ---- | ------- | --------- |
| index.ts | multiple named exports | Usually reexports the contents of the folder to provide a public API |
| ComponentName.tsx | single default export | Implements a single component, hinting at a single export. Wrappers/subcomponent logic should be provided in separate files when needed. |
| types.ts | multiple named exports | Provides the required types for the current folder domain, itself potentially consisting of several files and object shapes. |
| debounce.ts | single default export | We encapsulate the functional logic in a single export. If additional functioanlity is required, it can live in the same file (if it's not exported) or in another file (for reusable logic). | 
| ComponentName.stories.tsx | multiple named exports (+ default export) | This is an exception, as this file conforms to the storybook standards. While the default export provides a configuration object for component stories, each named export corresponds to a story consuming this configuration. |

### FE.02 : Named exports type consistency.

Aside from files named `index.ts`, all files providing named exports should expose a single export shape.

| File | Exports Type | Rationale | 
| ---- | ------- | --------- |
| stories.ts | `Story` | This file is a collection of Storybook Stories | 
| transformers.ts | `(value:str) => str` | This file is a collection of Storybook Stories | 
| fixtures.ts | `Fixture` | Mock Data substituable to one another.|

> ✅ **Do**
> 
> + Identify the shape of the exports of your file before writing its contents.
> + Export objects that share the same type.
>   ```ts
>   export const myFuncA = (value:str) => {}
>   export const myFuncB = (value:str) => {}
>   export const myFuncC = (value:str) => {}
>   ```

> ❌ **Don't**
>
> + Export objects of different types/shapes from the same file 
>   ```ts
>   export const transformer = (value:str) => {}
>   export const reducer  = (map:str[]) => {}
>   ```
>   Or : 
>   ```ts
>   export const transformer = (value:str) => {}
>   Class ABC
>   export { ABC } 
>   ```


### FE.03 : Named exports reimport   

When directly importing the contents of a file containing named exports, use the `import * as` pattern to converve the namespace.

> ✅ **Do**
> 
> + Conserve the namespaces of named exports when reimporting. 
>   `import * as transformers from "./transformers.js"`

> ❌ **Don't**
>
> + Import directly the contents of a file containing named exports. 
>   `import { myFunc, otherFunc } from "./transformers.js"`

