import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, type Mock } from 'vitest';
import { useProjectsFilters } from './useProjectsFilters';
import { useUrlParams } from '@/hooks/useUrlParams';

vi.mock('@/hooks/useUrlParams', () => ({
  useUrlParams: vi.fn(),
}));

type MockReturn = {
  value: string;
  setValue: Mock;
};

describe('useProjectsFilters() (unit)', () => {
  const typeMock: MockReturn = {
    value: 'all',
    setValue: vi.fn(),
  };

  const statusMock: MockReturn = {
    value: 'all',
    setValue: vi.fn(),
  };

  const titleMock: MockReturn = {
    value: '',
    setValue: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    (useUrlParams as Mock)
      // type
      .mockReturnValueOnce(typeMock)
      // status
      .mockReturnValueOnce(statusMock)
      // title (with debounce)
      .mockReturnValueOnce(titleMock);
  });

  test('returns default filters and hasActiveFilters = false', () => {
    const { result } = renderHook(() => useProjectsFilters({ lng: 'en' }));

    expect(result.current.filters).toEqual({
      type: 'all',
      status: 'all',
      title: '',
    });

    expect(result.current.hasActiveFilters).toBe(false);
  });

  test('sets hasActiveFilters = true when any filter changes', () => {
    typeMock.value = 'frontend';

    const { result } = renderHook(() => useProjectsFilters({ lng: 'en' }));

    expect(result.current.hasActiveFilters).toBe(true);
    expect(result.current.filters.type).toBe('frontend');
  });

  test('resetAll resets all filters to defaults', () => {
    typeMock.value = 'backend';
    statusMock.value = 'active';
    titleMock.value = 'react';

    const { result } = renderHook(() => useProjectsFilters({ lng: 'en' }));

    act(() => {
      result.current.resetAll();
    });

    expect(typeMock.setValue).toHaveBeenCalledWith('all');
    expect(statusMock.setValue).toHaveBeenCalledWith('all');
    expect(titleMock.setValue).toHaveBeenCalledWith('');
  });

  test('applies debounce only to title filter', () => {
    const { result } = renderHook(() => useProjectsFilters({ lng: 'en' }));

    act(() => {
      result.current.setTitle('next');
    });

    expect(titleMock.setValue).toHaveBeenCalledWith('next');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(titleMock.setValue).toHaveBeenCalledTimes(1);
  });
});
