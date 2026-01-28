import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { useUrlParams } from './useUrlParams';

const replaceMock = vi.fn();

let searchParamsMock: URLSearchParams;

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => searchParamsMock,
}));

function setSearchParams(query: string) {
  searchParamsMock = new URLSearchParams(query);
}

describe('useUrlParams() (unit)', () => {
  beforeEach(() => {
    replaceMock.mockClear();
    setSearchParams('');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('initializes with defaultValue when param is missing', () => {
    const { result } = renderHook(() =>
      useUrlParams('q', {
        basePath: '/projects',
        defaultValue: 'all',
      }),
    );

    expect(result.current.value).toBe('all');
    expect(result.current.urlValue).toBe('all');
    expect(replaceMock).not.toHaveBeenCalled();
  });

  test('initializes from URL param when present', () => {
    setSearchParams('q=react');

    const { result } = renderHook(() =>
      useUrlParams('q', {
        basePath: '/projects',
      }),
    );

    expect(result.current.value).toBe('react');
    expect(result.current.urlValue).toBe('react');
  });

  test('updates local value immediately when setValue is called', () => {
    const { result } = renderHook(() =>
      useUrlParams('q', {
        basePath: '/projects',
      }),
    );

    act(() => {
      result.current.setValue('abc');
    });

    expect(result.current.value).toBe('abc');
  });

  test('updates URL immediately when debounceMs is 0', () => {
    const { result } = renderHook(() =>
      useUrlParams('q', {
        basePath: '/projects',
        debounceMs: 0,
      }),
    );

    act(() => {
      result.current.setValue('react');
    });

    expect(replaceMock).toHaveBeenCalledWith('/projects?q=react');
  });

  test('debounces URL update when debounceMs > 0', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useUrlParams('q', {
        basePath: '/projects',
        debounceMs: 500,
      }),
    );

    act(() => {
      result.current.setValue('react');
    });

    // Not yet
    expect(replaceMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(replaceMock).toHaveBeenCalledWith('/projects?q=react');
  });

  test('removes param from URL when value is empty', () => {
    setSearchParams('q=react');

    const { result } = renderHook(() =>
      useUrlParams('q', {
        basePath: '/projects',
      }),
    );

    act(() => {
      result.current.setValue('');
    });

    expect(replaceMock).toHaveBeenCalledWith('/projects');
  });

  test('does not navigate when value equals current urlValue', () => {
    setSearchParams('q=react');

    const { result } = renderHook(() =>
      useUrlParams('q', {
        basePath: '/projects',
      }),
    );

    act(() => {
      result.current.setValue('react');
    });

    expect(replaceMock).not.toHaveBeenCalled();
  });

  test('syncs local state when URL param changes externally', () => {
    setSearchParams('q=react');

    const { result, rerender } = renderHook(() =>
      useUrlParams('q', {
        basePath: '/projects',
      }),
    );

    expect(result.current.value).toBe('react');

    // External navigation
    setSearchParams('q=vue');
    rerender();

    expect(result.current.value).toBe('vue');
  });
});
