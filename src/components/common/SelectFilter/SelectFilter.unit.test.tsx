import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { SelectFilter } from './SelectFilter';

const OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
] as const;

describe('<SelectFilter /> (unit)', () => {
  test('renders label', () => {
    render(
      <SelectFilter
        id="tech"
        label="Tech"
        placeholder="Select tech"
        options={OPTIONS}
        value="all"
        onValueChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Tech')).toBeInTheDocument();
  });

  test('renders options when opened', async () => {
    const user = userEvent.setup();

    render(
      <SelectFilter
        id="tech"
        label="Tech"
        placeholder="Select tech"
        options={OPTIONS}
        value="all"
        onValueChange={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('combobox'));

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });

  test('calls onValueChange with selected value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <SelectFilter
        id="tech"
        label="Tech"
        placeholder="Select tech"
        options={OPTIONS}
        value="all"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('React'));

    expect(onValueChange).toHaveBeenCalledWith('react');
  });
});
