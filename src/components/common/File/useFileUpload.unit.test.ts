/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { useFileUpload } from './useFileUpload';

describe('useFileUpload (unit)', () => {
  const defaultOptions = {
    maxSize: 10,
    maxFiles: 5,
    multiple: true,
    disabled: false,
  };

  describe('initial state', () => {
    test('start with dragOver in false', () => {
      const { result } = renderHook(() => useFileUpload(defaultOptions));

      expect(result.current.dragOver).toBe(false);
    });
  });

  describe('drag & drop Handlers', () => {
    test('handleDragOver actives dragOver', () => {
      const { result } = renderHook(() => useFileUpload(defaultOptions));

      const mockEvent = {
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.handleDragOver(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(result.current.dragOver).toBe(true);
    });

    test('handleDragOver NOT actives dragOver when is disabled', () => {
      const { result } = renderHook(() => useFileUpload({ ...defaultOptions, disabled: true }));

      const mockEvent = {
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.handleDragOver(mockEvent);
      });

      expect(result.current.dragOver).toBe(false);
    });

    test('handleDragLeave deactivates dragOver', () => {
      const { result } = renderHook(() => useFileUpload(defaultOptions));

      const mockEvent = {
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.handleDragOver(mockEvent);
      });

      expect(result.current.dragOver).toBe(true);

      act(() => {
        result.current.handleDragLeave(mockEvent);
      });

      expect(result.current.dragOver).toBe(false);
    });
  });

  describe('handleDrop', () => {
    test('process valid files', () => {
      const onFilesChange = vi.fn();
      const { result } = renderHook(() => useFileUpload({ ...defaultOptions, onFilesChange }));

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [file],
        },
      } as any;

      act(() => {
        result.current.handleDrop(mockEvent, []);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(result.current.dragOver).toBe(false);
      expect(onFilesChange).toHaveBeenCalledWith([file]);
    });

    test('NOT process files when is disabled', () => {
      const onFilesChange = vi.fn();
      const { result } = renderHook(() =>
        useFileUpload({ ...defaultOptions, disabled: true, onFilesChange }),
      );

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [file],
        },
      } as any;

      act(() => {
        result.current.handleDrop(mockEvent, []);
      });

      expect(onFilesChange).not.toHaveBeenCalled();
    });

    test('adds to existing files in multiple mode', () => {
      const onFilesChange = vi.fn();
      const { result } = renderHook(() =>
        useFileUpload({ ...defaultOptions, multiple: true, onFilesChange }),
      );

      const existingFile = new File(['old'], 'old.txt', { type: 'text/plain' });
      const newFile = new File(['new'], 'new.txt', { type: 'text/plain' });

      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [newFile],
        },
      } as any;

      act(() => {
        result.current.handleDrop(mockEvent, [existingFile]);
      });

      expect(onFilesChange).toHaveBeenCalledWith([existingFile, newFile]);
    });

    test('replaces in single mode', () => {
      const onFilesChange = vi.fn();
      const { result } = renderHook(() =>
        useFileUpload({ ...defaultOptions, multiple: false, onFilesChange }),
      );

      const existingFile = new File(['old'], 'old.txt', { type: 'text/plain' });
      const newFile = new File(['new'], 'new.txt', { type: 'text/plain' });

      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [newFile],
        },
      } as any;

      act(() => {
        result.current.handleDrop(mockEvent, [existingFile]);
      });

      // En modo single, retorna solo el nuevo archivo
      expect(onFilesChange).toHaveBeenCalledWith(newFile);
    });

    test('rejects invalid files', () => {
      const onFilesChange = vi.fn();
      const onValidationError = vi.fn();

      const { result } = renderHook(() =>
        useFileUpload({
          ...defaultOptions,
          maxSize: 1, // 1MB
          onFilesChange,
          onValidationError,
        }),
      );

      const largeFile = new File(['a'.repeat(5 * 1024 * 1024)], 'large.txt', {
        type: 'text/plain',
      });

      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [largeFile],
        },
      } as any;

      act(() => {
        result.current.handleDrop(mockEvent, []);
      });

      expect(onFilesChange).not.toHaveBeenCalled();

      expect(onValidationError).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'size',
            file: largeFile,
          }),
        ]),
      );
    });
  });

  describe('handleFileChange', () => {
    test('process input files', () => {
      const onFilesChange = vi.fn();
      const { result } = renderHook(() => useFileUpload({ ...defaultOptions, onFilesChange }));

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const mockEvent = {
        target: {
          files: [file],
          value: 'path/to/test.txt',
        },
      } as any;

      act(() => {
        result.current.handleFileChange(mockEvent, []);
      });

      expect(onFilesChange).toHaveBeenCalledWith([file]);

      expect(mockEvent.target.value).toBe('');
    });

    test('resets the input after processing', () => {
      const onFilesChange = vi.fn();
      const { result } = renderHook(() => useFileUpload({ ...defaultOptions, onFilesChange }));

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const mockEvent = {
        target: {
          files: [file],
          value: 'test.txt',
        },
      } as any;

      act(() => {
        result.current.handleFileChange(mockEvent, []);
      });

      expect(mockEvent.target.value).toBe('');
    });
  });

  describe('callbacks', () => {
    test('call onValidationError when there are invalid files', () => {
      const onValidationError = vi.fn();
      const { result } = renderHook(() =>
        useFileUpload({ ...defaultOptions, maxSize: 1, onValidationError }),
      );

      const largeFile = new File(['a'.repeat(5 * 1024 * 1024)], 'large.txt', {
        type: 'text/plain',
      });

      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [largeFile],
        },
      } as any;

      act(() => {
        result.current.handleDrop(mockEvent, []);
      });

      expect(onValidationError).toHaveBeenCalledTimes(1);
      expect(onValidationError).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'size',
          }),
        ]),
      );
    });
  });

  describe('Stability (useCallback)', () => {
    test('handlers maintain stable reference', () => {
      const { result, rerender } = renderHook(() => useFileUpload(defaultOptions));

      const firstHandleDragOver = result.current.handleDragOver;
      const firstHandleDrop = result.current.handleDrop;

      rerender();

      expect(result.current.handleDragOver).toBe(firstHandleDragOver);
      expect(result.current.handleDrop).toBe(firstHandleDrop);
    });
  });
});
