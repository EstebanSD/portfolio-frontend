import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { EmptyStateCard } from './EmptyStateCard';

describe('<EmptyStateCard /> (unit)', () => {
  const baseProps = {
    title: 'No projects',
    description: 'You have not created any projects yet.',
    iconName: 'inbox',
  } as const;

  test('renders title and description', () => {
    render(<EmptyStateCard {...baseProps} />);

    expect(screen.getByRole('heading', { name: /no projects/i })).toBeInTheDocument();
    expect(screen.getByText(/you have not created any projects yet/i)).toBeInTheDocument();
  });

  test('renders the icon as decorative', () => {
    render(<EmptyStateCard {...baseProps} />);

    const icon = screen.getByTestId('empty-state-icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  test('applies custom className', () => {
    render(<EmptyStateCard {...baseProps} className="custom-card-class" />);

    expect(
      screen.getByRole('heading', { name: /no projects/i }).closest('.custom-card-class'),
    ).toBeTruthy();
  });
});
