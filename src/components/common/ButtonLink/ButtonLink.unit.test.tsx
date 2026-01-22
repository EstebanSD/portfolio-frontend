/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { ButtonLink } from './ButtonLink';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('ButtonLink (unit)', () => {
  test('renders as a link with correct href', () => {
    render(<ButtonLink href="/about">About</ButtonLink>);

    const link = screen.getByRole('link', { name: /about/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  test('applies default variant classes', () => {
    render(<ButtonLink href="/">Home</ButtonLink>);

    const link = screen.getByRole('link');

    expect(link.className).toContain('bg-primary');
  });

  test('applies variant classes when variant is provided', () => {
    render(
      <ButtonLink href="/" variant="secondary">
        Secondary
      </ButtonLink>,
    );

    const link = screen.getByRole('link');

    expect(link.className).toContain('bg-secondary');
  });

  test('applies size classes when size is provided', () => {
    render(
      <ButtonLink href="/" size="sm">
        Small
      </ButtonLink>,
    );

    const link = screen.getByRole('link');

    expect(link.className).toContain('h-8');
  });

  test('merges custom className', () => {
    render(
      <ButtonLink href="/" className="custom-class">
        Custom
      </ButtonLink>,
    );

    const link = screen.getByRole('link');

    expect(link).toHaveClass('custom-class');
  });

  test('forwards additional props to the link', () => {
    render(
      <ButtonLink href="/" aria-label="Go home">
        Home
      </ButtonLink>,
    );

    expect(screen.getByLabelText('Go home')).toBeInTheDocument();
  });
});
