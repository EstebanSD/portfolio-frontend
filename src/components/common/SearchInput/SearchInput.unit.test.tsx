import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { SearchInput } from './SearchInput';

describe('<SearchInput /> (unit)', () => {
  test('renders label and input', () => {
    render(
      <SearchInput
        id="search"
        label="Search"
        placeholder="Type here"
        value=""
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  test('renders the provided value', () => {
    render(
      <SearchInput
        id="search"
        label="Search"
        placeholder="Type here"
        value="hello"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  test('calls onChange on each keystroke', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SearchInput
        id="search"
        label="Search"
        placeholder="Type here"
        value=""
        onChange={onChange}
      />,
    );

    await user.type(screen.getByRole('searchbox'), 'abc');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith('c');
  });
});
