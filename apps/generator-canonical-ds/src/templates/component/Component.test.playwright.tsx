/* <%= pkg %> <%= version %> */

import { type Page, expect, test } from "@playwright/test";

async function setup(page: Page) {
  await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <div id="root"></div>
      </body>
      </html>
    `);

  // Simulate mounting the React component
  await page.addScriptTag({
    content: `
      const React = require('react');
      const ReactDOM = require('react-dom');
      const <%= componentName %> = require('./<%= componentName %>.js').default;
      ReactDOM.render(React.createElement(<%= componentName %>), document.getElementById('root'));
    `,
  });
}

test.describe("<%= componentName %> component", () => {
  test("renders without crashing", async ({ page }) => {
    await setup(page);

    const component = await page.locator(
      '<div class="<%= namespace %> <%= componentName.toLowerCase() %>">',
    );
    await expect(component).toBeVisible();
  });

  test("renders children correctly", async ({ page }) => {
    await setup(page);

    const childContent = await page.locator('text="Hello World"');
    await expect(childContent).toBeVisible();
  });
});