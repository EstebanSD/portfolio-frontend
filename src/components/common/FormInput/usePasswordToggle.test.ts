import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePasswordToggle } from './usePasswordToggle';

describe('usePasswordToggle', () => {
  describe('initial state', () => {
    test('should start with showPassword set to false', () => {
      const { result } = renderHook(() => usePasswordToggle());

      expect(result.current.showPassword).toBe(false);
    });

    test('should start with showPassword set to true', () => {
      const { result } = renderHook(() => usePasswordToggle(true));

      expect(result.current.showPassword).toBe(true);
    });
  });

  describe('toggle behavior', () => {
    test('should change to true when calling toggle', () => {
      const { result } = renderHook(() => usePasswordToggle());

      act(() => {
        result.current.toggle();
      });

      expect(result.current.showPassword).toBe(true);
    });

    test('should alternates between true/false in multiple toggles', () => {
      const { result } = renderHook(() => usePasswordToggle());

      act(() => result.current.toggle());
      expect(result.current.showPassword).toBe(true);

      act(() => result.current.toggle());
      expect(result.current.showPassword).toBe(false);

      act(() => result.current.toggle());
      expect(result.current.showPassword).toBe(true);
    });
  });

  describe('getInputType behavior', () => {
    test('should return "password" when baseType is password and showPassword is false', () => {
      const { result } = renderHook(() => usePasswordToggle());

      const type = result.current.getInputType('password');

      expect(type).toBe('password');
    });

    test('should return "text" when baseType is password and showPassword is true', () => {
      const { result } = renderHook(() => usePasswordToggle());

      act(() => {
        result.current.toggle();
      });

      const type = result.current.getInputType('password');

      expect(type).toBe('text');
    });

    test('should return the same type when baseType is not password', () => {
      const { result } = renderHook(() => usePasswordToggle(true));

      expect(result.current.getInputType('text')).toBe('text');
      expect(result.current.getInputType('email')).toBe('email');
      expect(result.current.getInputType('number')).toBe('number');
    });
  });
});
