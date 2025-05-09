# React Standards Reference (R.)

This document outlines the standards and conventions for developing React components within the Canonical Design System. It aims to ensure consistency, maintainability, readability, and reusability across all React packages.

## Introduction

Our React components and development practices are guided by the following core principles:

* **Simplicity:** Strive for clear, understandable code, APIs, and component structures. Reduce complexity where possible.
* **Performance:** Optimize components for speed and efficiency in both development and production.
* **SSR Compatibility:** Ensure components can be rendered on the server side without issues.
* **Accessibility:** Aim for [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) compliance by default.
* **Modernity:** Embrace forward-looking technologies and best practices in the React ecosystem.

## R.FS - File and Folder Structure

### R.FS.1 Component Folder Structure
Each component resides in its own PascalCase named folder (e.g., `Button`, `Tooltip`). The standard files within this folder are:

+ `ComponentName.tsx`: The main component implementation.
+ `ComponentName.stories.tsx`: Storybook stories for demonstration and documentation.
+ `ComponentName.tests.tsx`: Unit and integration tests using Vitest and React Testing Library.
+ `index.ts`: The public API of the component, re-exporting the component, types, and related utilities.
+ `styles.css`: Component-specific CSS styles (if applicable).
+ `types.ts`: TypeScript type definitions, primarily for component props.

> ✅ **Do**
> 
> Create a component folder that contains all of the above mentioned files.

> ❌ **Don't**
>
> + Create a component folder that doesn't contain stories `ComponentName.stories.tsx`. 
> + Create a component file where the types are not included in `types.ts` but alongside the object.
> + Create a component folder where the public api is not fully described by `index.ts`. All external imports should always point at "path/to/Component/index.js" or its parents. 


### R.FS.2 Subcomponents Location
For complex components that can be broken down into smaller, manageable parts intended primarily for internal use by the parent component:

* **Location**: A `common/` subdirectory within the parent component's folder.
  *Example:* `src/ui/Tooltip/common/`
* **Naming**: Avoiding prefixing subcomponent names with the parent component's name - we assume the folder structure already provides the domain. However, when reexporting a public interface, the prefix can be added
  *Example:* If `Card` is the parent, a subcomponent might be `CardHeader`.
* **Exports**:
  * Subcomponents should be re-exported from an `index.ts` file within the `common/` directory (e.g., `common/index.ts`).
  * The parent component's main `index.ts` can then choose to import from `common/index.js` and selectively re-export subcomponents if they are intended for public consumption. Otherwise, they remain internal implementation details.

> ✅ **Do**
> 
> + Create a `MyComponent/common` directory
> + Code Generate, or add manually your subcomponents in that folder
> + Ensure the generated Storybook story file configuration name uses the common domain `MyComponent/common/MySubcomponent`
> + Reexport in `MyComponent/index.ts` the contents of your common directory with a named prefix as ` export { Icon as CardIcon } from "./common/index.js" `


> ❌ **Don't**
>
> + Create subcomponents in a directory other than `common`. 
> + Prefix your subcomponents folder with the name of the parent, for instance `Card/common/CardIcon`

### R.FS.3 Custom Hooks
* **Local Hooks (Single Component Scope)**:
  * If a hook is used by only one component and has limited applicability to other code, it can be a `<hookName>.ts` file directly within the component's directory.
  * If a component has multiple local hooks, or a local hook requires its own types, create a `hooks/` subdirectory within the component folder (e.g., `src/ui/ComponentName/hooks/`).
    * Inside `hooks/`, each hook can have its own folder with `index.ts`, `types.ts`, and `<hookName>.ts` if complex, or just `<hookName>.ts` if simple.
* **Global Hooks (Reusable Across Packages/Tiers)**:
  * **Location**: Place in a shared `hooks/` directory at the package level, typically `src/ui/hooks/`.
  * **Structure**: Each global hook should reside in its own named folder (e.g., `src/ui/hooks/useWindowFitment/`). This folder should contain:
    * `<hookName>.ts`: The hook implementation.
    * `types.ts`: TypeScript definitions for the hook's props and return values.
    * `index.ts`: Re-exports the hook and its types.
      *Example:* `src/ui/hooks/useWindowFitment/`, `src/ui/hooks/useDelayedToggle/`.

### 2.4. Context Providers
For components managing shared state via Context:

* Files are typically located directly within the component's directory that establishes the context.
* `Context.tsx`: Defines the React context using `createContext(null)`.
* `Provider.tsx`: The component that will provide the context value and wrap children. It often uses a custom hook to manage its state.
* `types.ts`: Includes type definitions for the context's value (`ContextOptions`).
* A custom hook (e.g., in `hooks/useMyContextState.ts`) is often created to consume the context via `useContext`.

## 3. Component Definition

### 3.1. Functional Components
- All components **must** be functional components.
- Use arrow function syntax for defining components.
  ```typescript
  import type Props from "./types.js";
  import "./styles.css"; // If styles are needed

  const MyComponent = ({ id, className, children, ...props }: Props): React.ReactElement => {
    return (
      <div id={id} className={className} {...props}>
        {children}
      </div>
    );
  };

  export default MyComponent;
  ```
### 3.2. Naming
- Component names **must** use PascalCase (e.g., `Button`, `Chip`, `TooltipArea`).

### 3.3. Props
#### 3.3.1. Prop Types (`types.ts`)
- Define props in an interface, typically named `ComponentNameProps`.
- Props interfaces should be clearly documented with JSDoc comments explaining each prop's purpose, possible values, and default behavior.
- If a component is intended to wrap standard HTML elements, its props should extend the relevant HTMLAttributes from React and allow pass-through of standard attributes. 
Ex:
```typescript
import type { ButtonHTMLAttributes, ReactNode } from "react";

  // Component-specific props
export interface BaseProps {
  children: ReactNode;
  appearance?: string;
}

// Combine base props with standard button attributes
type Props = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
export default Props;
```

#### 3.3.2. Standard Base Props
Components should support a set of standard base props to ensure a base level of consistency and customizability across all components. 
The following interface is not currently provided by the codebase in one single place, but is provided as a reference for all components to use:

```typescript
export interface StandardComponentProps {
  /** A unique identifier for the component */
  id?: string;
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Inline styles to apply to the component */
  style?: React.CSSProperties;
  /** Content to be rendered inside the component */
  children?: React.ReactNode; // Or a more specific type if children have constraints
}
```

#### 3.3.3. Prop Destructuring and Defaults
- Destructure props in the component's function signature.
- Provide default values for optional props directly in the destructuring assignment.
  ```typescript
  const Chip = ({
    appearance = "neutral", // Default value
    lead,
    value,
    ...props
  }: ChipPropsType): React.ReactElement => { /* ... */ };
  ```

#### 3.3.4. Spreading Props
- Spread remaining props (`...props`) onto the root HTML element of the component to allow pass-through of standard HTML attributes (e.g., `aria-*`, `data-*`, event handlers). Ensure this is done safely and doesn't override critical internal attributes without intention.

#### 3.3.5. `children` Prop
- Use `children: React.ReactNode` for components that are designed to wrap arbitrary content.
- Be specific with the type of `children` if the component expects a particular structure or type of child.

### 3.4. Return Type
- Components **must** explicitly type their return value as `React.ReactElement`.

### 3.5. CSS Class Application
- Dynamically build the `className` string, filtering out falsy values, to combine base classes, prop-driven classes, and user-provided classes.
  ```typescript
  className={[
    componentCssClassname, // from the top of the file, i.e., `ds button`
    className // from props.className
  ].filter(Boolean).join(" ")}
  ```
## 4. State Management

**React component files themselves should be kept as stateless as possible.** This enhances readability, testability, and reusability. Delegate stateful logic to:

1.  **Custom Hooks:** For reusable stateful logic or complex state interactions tied to a component or group of components.
2.  **Context Providers:** For global or tree-wide state that needs to be accessed by many components without prop drilling.

The `Drawer` component (`apps/react/demo/src/ui/Drawer/Drawer.tsx` serves as a good example of this delegation.

### 4.1. Custom Hooks
- **Purpose**: Encapsulate state logic (using React hooks like `useState`, `useEffect`, `useReducer`), side effects, and memoized computations.
- **Return Value**: Hooks should return their values (state and functions) as a single object, memoized with `useMemo` to prevent unnecessary re-renders in consuming components if the hook's internal dependencies haven't changed.
  ```typescript
  // Simplified example structure
  const useMyHook = (props: MyHookProps): MyHookResult => {
    const [value, setValue] = useState(props.initialValue);

    const memoizedFunction = useCallback(() => {
      // ...
    }, [dependencies]);

    return useMemo(() => ({
      value,
      action: memoizedFunction,
    }), [value, memoizedFunction]);
  };
  ```
- **Memoization**:
  - Use `useCallback` to memoize functions returned by or used within hooks.
  - Use `useMemo` to memoize complex calculations or the object returned by the hook.
- **SSR Safety**: For hooks interacting with browser-specific APIs (like `window` or `document`), ensure they are SSR-safe by checking `typeof window === "undefined"` before accessing such APIs. Initialize state to sensible defaults for the server environment.
  *Example from `useWindowDimensions.ts`*:
  ```typescript
  const isServer = typeof window === "undefined";
  const [windowWidth, setWindowWidth] = useState(isServer ? 0 : window.innerWidth);
  ```

### 4.2. Context API
- **Purpose**: To share data that can be considered "global" for a tree of React components, such as theme information, user authentication status, or state for a set of related components.
- **Structure**:
  1.  **`types.ts`**: Define an interface for the context's value (e.g., `ContextOptions`).
  2.  **`Context.tsx`**: Create the context using `React.createContext`. Provide a default value that matches the `ContextOptions` type (can be `null` or a meaningful default).
      ```typescript
      // Context.tsx (Example)
      import { createContext } from 'react';
      import type { MyContextOptions } from './types';

      export const MyContext = createContext<MyContextOptions | null>(null);
      ```
  3.  **Custom Hook (Consumer)**: Create a custom hook (e.g., `useMyContext`) that uses `useContext(MyContext)` to access the context value. This hook often includes error handling if used outside a provider.
  4.  **`Provider.tsx`**: Implement the Provider component. This component will manage the state (often via its own custom hook) and provide this state to its children via `MyContext.Provider`.
      ```typescript
      // Provider.tsx (Example)
      import { MyContext } from './Context';
      import { useMyProviderState } from './hooks/useMyProviderState'; // Hook managing the state

      const MyProvider = ({ children, ...initialProps }) => {
        const contextValue = useMyProviderState(initialProps);
        return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
      };
      export default MyProvider;
      ```
- **Exports**: The main `index.ts` for a component group using context should export the Provider component and any associated consumer hooks or components.

## 5. Exports (`index.ts`)

Each component directory (and hook directory) **must** have an `index.ts` file. This file serves as the public API for that module.

- Export the default component: `export { default as ComponentName } from "./ComponentName.js";`
- Export named types, especially the primary props interface: `export type { ComponentNameProps } from "./types.js";` (or use `export * from "./types.js";` if all types are public).
- Export any related HOCs, utility functions, or publicly accessible subcomponents.

## 6. Higher-Order Components (HOCs)

- When creating HOCs (e.g., `withTooltip.tsx`):
  - The HOC should accept a `ComponentType<TProps>` and any other necessary arguments (like `Message` for `withTooltip`).
  - It should return a new functional component, typically typed as `FC<TProps>`.
  - Set the `displayName` of the wrapped component for easier debugging in React DevTools:
    ```typescript
    WrappedComponent.displayName = \`withMyHOC(${Component.displayName || Component.name || "Component"})\`;
    ```

## 7. Storybook (`*.stories.tsx`)

- **Title**: Use a clear, hierarchical title (e.g., `Button`, `Tooltip/TooltipArea`, `Tooltip/Internals/Tooltip`).
- **`autodocs` Tag**: Include `tags: ["autodocs"]` in the `meta` object to enable automatic documentation generation.
- **Args**: Define default and story-specific arguments (`args`) for props. Use `fn()` from `@storybook/test` to mock callback props and enable spying in tests.
- **Stories**: Each significant variation or state of the component should have its own named story. Use JSDoc comments above stories for descriptions that appear in Storybook.
- **Decorators**: Utilize decorators for providing context, wrapping stories with layout elements, or applying global styles necessary for the component to render correctly.
- **Parameters**: Use `parameters` for configuring story layout (e.g., `layout: "centered"`), backgrounds, or other Storybook addons.
- **MDX**: Use `.mdx` files for dedicated documentation pages that require more narrative content than autodocs provide (e.g., `Configure.mdx`, or usage guidelines).

## 8. Testing (`*.tests.tsx`)

- **Framework**: Use Vitest as the test runner and assertion library.
- **Library**: Use React Testing Library for rendering components and interacting with them in a user-centric way.
- **Coverage**: Aim for comprehensive test coverage, including:
  - Basic rendering of the component and its children.
  - Application of props (e.g., `className`, `style`, `appearance`).
  - Correct rendering of conditional logic based on props.
  - Event handler invocation (e.g., `onClick`, `onFocus`).
  - Accessibility attributes and states.
- **Mocking**: Use `vi.mock()` for mocking module dependencies and `vi.fn()` for creating spy functions.
- **Setup**: Utilize `vitest.setup.ts` for global test configurations, such as extending Vitest matchers with `jest-dom` and cleaning up the DOM after each test.
