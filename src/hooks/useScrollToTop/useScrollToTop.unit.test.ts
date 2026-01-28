import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useScrollToTop } from './useScrollToTop';

describe('useScrollToTop() (unit)', () => {
  let scrollHandler: (() => void) | null = null;

  beforeEach(() => {
    scrollHandler = null;

    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true,
    });

    vi.spyOn(window, 'addEventListener').mockImplementation((event, cb) => {
      if (event === 'scroll') {
        scrollHandler = cb as () => void;
      }
    });

    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {});
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  test('initially not visible when scroll is below threshold', () => {
    window.pageYOffset = 200;

    const { result } = renderHook(() => useScrollToTop());

    expect(result.current.isVisible).toBe(false);
  });

  test('initially visible when scroll is above threshold', () => {
    window.pageYOffset = 1300;

    const { result } = renderHook(() => useScrollToTop());

    expect(result.current.isVisible).toBe(true);
  });

  test('updates visibility on scroll', () => {
    window.pageYOffset = 0;
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      window.pageYOffset = 1500;
      scrollHandler?.();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      window.pageYOffset = 100;
      scrollHandler?.();
    });

    expect(result.current.isVisible).toBe(false);
  });

  test('scrollToTop scrolls smoothly to top', () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current.scrollToTop();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
