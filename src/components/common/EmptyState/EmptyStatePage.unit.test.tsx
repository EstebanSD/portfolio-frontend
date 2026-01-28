import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { EmptyStatePage } from './EmptyStatePage';

describe('<EmptyStatePage /> (unit)', () => {
  const baseProps = {
    title: 'No results',
    description: 'Try adjusting your search criteria.',
    iconName: 'search',
  } as const;

  test('renders title and description', () => {
    render(<EmptyStatePage {...baseProps} />);

    expect(screen.getByRole('heading', { name: /no results/i })).toBeInTheDocument();
    expect(screen.getByText(/try adjusting your search criteria/i)).toBeInTheDocument();
  });

  test('renders the icon as decorative', () => {
    render(<EmptyStatePage {...baseProps} />);

    const icon = screen.getByTestId('empty-state-icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  test('applies custom className to the container', () => {
    const { container } = render(<EmptyStatePage {...baseProps} className="custom-page-class" />);

    expect(container.firstChild).toHaveClass('custom-page-class');
  });
});
