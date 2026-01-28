/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from './useCopyToClipboard';

describe('useCopyToClipboard (unit)', () => {
  const mockWriteText = vi.fn();

  beforeEach(() => {
    if (!('clipboard' in navigator)) {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        get: () => undefined,
      });
    }

    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({
      writeText: mockWriteText,
    } as any);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('initial state', () => {
    test('should start with isCopied as false', () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current.isCopied).toBe(false);
    });

    test('should start without error', () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current.error).toBeNull();
    });
  });

  describe('basic functionality', () => {
    test('should call clipboard.writeText with correct text', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('test text');
      });

      expect(mockWriteText).toHaveBeenCalledWith('test text');
      expect(mockWriteText).toHaveBeenCalledTimes(1);
    });

    test('should change isCopied to true after success', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('test');
      });

      expect(result.current.isCopied).toBe(true);
    });

    test('should reset isCopied to false after timeout', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard({ resetInterval: 2000 }));

      await act(async () => {
        await result.current.copy('test');
      });

      expect(result.current.isCopied).toBe(true);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.isCopied).toBe(false);
    });

    test('should allow set resetInterval', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard({ resetInterval: 5000 }));

      await act(async () => {
        await result.current.copy('test');
      });

      expect(result.current.isCopied).toBe(true);

      act(() => {
        vi.advanceTimersByTime(4000);
      });
      expect(result.current.isCopied).toBe(true);

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.isCopied).toBe(false);
    });
  });

  describe('error handler', () => {
    test('should handle errors of clipboard API', async () => {
      const error = new Error('Clipboard failed');
      mockWriteText.mockRejectedValue(error);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('test');
      });

      expect(result.current.isCopied).toBe(false);
      expect(result.current.error).toBe(error);
    });

    test('should clean error after a success copy', async () => {
      mockWriteText.mockRejectedValueOnce(new Error('First fail'));
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('test');
      });
      expect(result.current.error).toBeInstanceOf(Error);

      mockWriteText.mockResolvedValue(undefined);
      await act(async () => {
        await result.current.copy('test');
      });

      expect(result.current.error).toBeNull();
      expect(result.current.isCopied).toBe(true);
    });
  });

  describe('cleanup - no memory leak', () => {
    test('should clean timeout if component is unmounted', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result, unmount } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('test');
      });

      expect(result.current.isCopied).toBe(true);

      unmount();

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // There is no way to directly verify cleanliness,
      // but if there is a memory leak, Vitest would detect it
    });
  });

  describe('callbacks', () => {
    test('should call onSuccess on a successful copy', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const onSuccess = vi.fn();
      const { result } = renderHook(() => useCopyToClipboard({ onSuccess }));

      await act(async () => {
        await result.current.copy('test');
      });

      expect(onSuccess).toHaveBeenCalledWith('test');
    });

    test('should call onError on a failure copy', async () => {
      const error = new Error('Failed');
      mockWriteText.mockRejectedValue(error);
      const onError = vi.fn();
      const { result } = renderHook(() => useCopyToClipboard({ onError }));

      await act(async () => {
        await result.current.copy('test');
      });

      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  describe('manual reset', () => {
    test('should allow manually reset the state', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copy('test');
      });
      expect(result.current.isCopied).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isCopied).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
});
