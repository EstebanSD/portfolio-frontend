import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePasswordToggle } from './usePasswordToggle';

describe('usePasswordToggle (unit)', () => {
  describe('initial state', () => {
    test('should start with showPassword false by default', () => {
      const { result } = renderHook(() => usePasswordToggle());

      expect(result.current.showPassword).toBe(false);
    });

    test('should respect initial value when provided', () => {
      const { result } = renderHook(() => usePasswordToggle(true));

      expect(result.current.showPassword).toBe(true);
    });
  });

  describe('toggle()', () => {
    test('should invert showPassword value', () => {
      const { result } = renderHook(() => usePasswordToggle());

      act(() => {
        result.current.toggle();
      });

      expect(result.current.showPassword).toBe(true);
    });

    test('should alternate between several switches', () => {
      const { result } = renderHook(() => usePasswordToggle());

      act(() => result.current.toggle());
      expect(result.current.showPassword).toBe(true);

      act(() => result.current.toggle());
      expect(result.current.showPassword).toBe(false);

      act(() => result.current.toggle());
      expect(result.current.showPassword).toBe(true);
    });
  });

  describe('getInputType()', () => {
    test('should return password when baseType is password and showPassword is false', () => {
      const { result } = renderHook(() => usePasswordToggle());

      expect(result.current.getInputType('password')).toBe('password');
    });

    test('should return text when baseType is password and showPassword is true', () => {
      const { result } = renderHook(() => usePasswordToggle());

      act(() => result.current.toggle());
      expect(result.current.getInputType('password')).toBe('text');
    });

    test('should return baseType unchanged when it is not password', () => {
      const { result } = renderHook(() => usePasswordToggle(true));

      expect(result.current.getInputType('text')).toBe('text');
      expect(result.current.getInputType('email')).toBe('email');
      expect(result.current.getInputType('number')).toBe('number');
    });
  });
});
