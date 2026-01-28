import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useUrlParams } from '@/hooks/useUrlParams';
import { describe, test, expect } from 'vitest';
import { SelectFilterFromUrl } from './SelectFilterFromUrl';

vi.mock('@/hooks/useUrlParams', () => ({
  useUrlParams: vi.fn(),
}));

const OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'react', label: 'React' },
] as const;

describe('<SelectFilterFromUrl /> (integration)', () => {
  const setValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useUrlParams).mockReturnValue({
      value: 'all',
      setValue,
      urlValue: 'all',
    });
  });

  test('renders with value from url params', () => {
    render(
      <SelectFilterFromUrl
        paramKey="tech"
        label="Tech"
        placeholder="Select tech"
        options={OPTIONS}
        basePath="/projects"
      />,
    );

    expect(screen.getByText('All')).toBeInTheDocument();
  });

  test('calls setValue when option changes', async () => {
    const user = userEvent.setup();

    render(
      <SelectFilterFromUrl
        paramKey="tech"
        label="Tech"
        placeholder="Select tech"
        options={OPTIONS}
        basePath="/projects"
      />,
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('React'));

    expect(setValue).toHaveBeenCalledWith('react');
  });

  test('calls useUrlParams with correct config', () => {
    render(
      <SelectFilterFromUrl
        paramKey="tech"
        label="Tech"
        placeholder="Select tech"
        options={OPTIONS}
        basePath="/projects"
        debounceMs={300}
        initialValue="all"
      />,
    );

    expect(useUrlParams).toHaveBeenCalledWith('tech', {
      basePath: '/projects',
      defaultValue: 'all',
      debounceMs: 300,
    });
  });
});
