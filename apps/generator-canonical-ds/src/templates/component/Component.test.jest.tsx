/* <%= pkg %> <%= version %> */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import <%= componentName %> from './<%= componentName %>.js';

describe('<%= componentName %> component', () => {
  test('renders without crashing', () => {
    render(<<%= componentName %> />);
    expect(screen.getByText('<%= componentName %>')).toBeDefined();
  });

  test('renders children correctly', () => {
    render(<<%= componentName %>>Hello World</<%= componentName %>>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('applies className correctly', () => {
    const { container } = render(<<%= componentName %> className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });
});