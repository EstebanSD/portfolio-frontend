import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { SearchInputControlled } from './SearchInputControlled';

describe('<SearchInputControlled /> (integration)', () => {
  test('passes props to SearchInput', () => {
    render(
      <SearchInputControlled
        paramKey="query"
        label="Search"
        placeholder="Search..."
        value="test"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Search')).toHaveValue('test');
  });
});
