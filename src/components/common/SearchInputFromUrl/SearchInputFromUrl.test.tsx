import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { useUrlParams } from '@/hooks/useUrlParams';
import { SearchInputFromUrl } from './SearchInputFromUrl';

vi.mock('@/hooks/useUrlParams', () => ({
  useUrlParams: vi.fn(),
}));

describe('<SearchInputFromUrl /> (integration)', () => {
  const setValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useUrlParams).mockReturnValue({
      value: 'initial',
      urlValue: 'initial',
      setValue,
    });
  });

  test('renders with value from url params', () => {
    render(
      <SearchInputFromUrl
        paramKey="q"
        label="Search"
        placeholder="Search..."
        basePath="/products"
      />,
    );

    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
  });

  test('updates url param on change', async () => {
    const user = userEvent.setup();

    render(
      <SearchInputFromUrl
        paramKey="q"
        label="Search"
        placeholder="Search..."
        basePath="/products"
      />,
    );

    await user.type(screen.getByRole('searchbox'), 's');

    expect(setValue).toHaveBeenLastCalledWith('initials');
  });

  test('calls useUrlParams with correct config', () => {
    render(
      <SearchInputFromUrl
        paramKey="q"
        label="Search"
        placeholder="Search..."
        basePath="/products"
        debounceMs={300}
        defaultValue="x"
      />,
    );

    expect(useUrlParams).toHaveBeenCalledWith('q', {
      basePath: '/products',
      debounceMs: 300,
      defaultValue: 'x',
    });
  });
});
