# CSS Standards Reference

This document outlines the standards and conventions for writing CSS within the Canonical Design System. It is intended as a reference guide to ensure consistency, maintainability, and scalability of the styles.

## 1. File Organization and Structure

### 1.1. File Naming
- Component-specific styles should be located in a file named `styles.css` within their respective component's directory.
  *Example:* `src/ui/Button/styles.css`

### 1.2. Global Styles
- A root `index.css` file (e.g., `src/index.css`) is used to:
  - Import foundational style sheets (e.g., `@import url("@canonical/styles");`).
  - Define global CSS custom properties within the `:root` selector.

### 1.3. Internal File Structure
Component `styles.css` files should generally follow this order:

1. **Component Variables Block**: A clearly marked block declaring and detailing the CSS custom properties available for that component. Each variable name should follow the [CTI naming convention](https://github.com/amzn/style-dictionary/blob/86c2c30ba289121f7dc9c28f573d1996dbc4a3a8/README.md#categorytypeitem-structure).
    ```css
    /** background color for the overlay behind the drawer */
    --drawer-overlay-background: rgba(0, 0, 0, 0.5);
    /** opacity of the overlay when the drawer is closed */
    --drawer-overlay-opacity-closed: 0;
    /** opacity of the overlay when the drawer is open */
    --drawer-overlay-opacity-open: 1;
    ```
2. **Base Component Styles**: The primary rule for the component using its designated class (e.g., `.ds.drawer`). `ds` is a design system-wide namespace that allows for easy identification of component classes, and helps to avoid conflicts with other systems. 
3. **Child Element Styles**: Styles for elements that are direct children or integral parts of the component, typically using child (`>`) selectors prefixed with the component class.
4. **Variant/Appearance (mode) Styles**: Styles for different visual appearances of the component, often applied via additional classes.
5. **State Styles**: Styles for interactive states like `:hover`, `:active`, `:focus`, and accessibility states like `[aria-hidden="true"]`.
6. **Pseudo-element Styles**: Styles for `::before` and `::after` pseudo-elements used for UI enhancements.

## 2. CSS Class Naming Conventions

### 2.1. Design System Prefix
- All component-specific classes must be prefixed with `ds` to namespace them under the Design System.

### 2.2. Component Base Class
- Each component has a base class composed of the `ds` prefix and the component's name.
  *Example:*
  * Button: `.ds.button`
  * Chip: `.ds.chip`
  * Tooltip: `.ds.tooltip`

### 2.3. Modifier and Variant Classes
- Variations in appearance or state are applied by adding modifier classes directly to the component's element alongside the base class.
  *Example:*
  * A tooltip positioned at the top: `.ds.tooltip.top`
  * A button with "positive" appearance might have a class `.positive` (dynamically added based on props).
  * An autofitting tooltip: `.ds.tooltip.autofit`

### 2.4. Child Element Classes
- Internal structural elements within a component should be styled using their own classes, or selected relative to the parent component class, often using the direct child selector (`>`). This helps to avoid overly broad selectors that could unintentionally affect other components.
- Internal elements or more specific selectors should be created using CSS nesting. This helps to keep the styles organized and maintainable.

*Example*:
```css
.ds.button {
    /** variables, base styles, etc. */
    & > .positive {
        color: var(--color-button-positive);
    }
}
```

## 3. CSS Custom Properties (Variables)

### 3.1. Purpose and Usage
- Custom properties are the primary method for enabling theming and customization.
- Primitives and theme variables are provided by the [tokens package](../../packages/tokens).
  - Generally, most of a component's variables should be mappings to tokens to ensure consistency and maintain the tokens package's ability to effect global changes.
  - Values that are especially simple (like setting opacity to 0 when hidden) may be hard-coded.

### 3.2. Naming Conventions
All variables follow [CTI naming convention](https://github.com/amzn/style-dictionary/blob/86c2c30ba289121f7dc9c28f573d1996dbc4a3a8/README.md#categorytypeitem-structure).

- **Global Variables**: Defined in `:root` (e.g., `--baseline-grid-color`, `--color-text-default`).
- **Component-Specific Variables**:
  - Convention: `--<component-name>-<property-group>-<specific-property>`
  - Example: `--button-color-background`, `--chip-border-radius`, `--tooltip-font-size`.
- **Intent Variables**: Semantic variables used for theming based on purpose (e.g., positive, negative, information). These allow components to adapt to a contextual theme.
  - Convention: `--intent-<property>-<variant/state>`
  - Examples:
    - `--intent-color`
    - `--intent-color-text`
    - `--intent-color-border`
    - `--intent-color-hover`
    - `--intent-color-active`
    - `--intent-color-text-tinted` (for subtle variations)
    - `--intent-color-tinted-hover`

### 3.3. Variable Fallbacks
- A common pattern is to attempt to use an intent variable first, fall back to a component-specific variable, and potentially fall back further to a global default.
  ```css
  /* Button component example */
  color: var(--intent-color-text, var(--button-color-text));
  background-color: var(--intent-color, var(--button-color-background));

  /* Tooltip component example with an additional global fallback */
  color: var(
    --intent-color-text,
    var(--tooltip-color-text, var(--color-text-default)) /* Global default if component/intent specific not set */
  );
  ```