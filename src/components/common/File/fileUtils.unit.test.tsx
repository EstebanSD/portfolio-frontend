/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FileAudioIcon, FileIcon, FileImageIcon, FileTextIcon, FileVideoIcon } from 'lucide-react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  validateFiles,
  formatFileSize,
  getFileIcon,
  normalizeFileValue,
  downloadFile,
} from './fileUtils';

describe('fileUtils (unit)', () => {
  describe('validateFiles', () => {
    const createMockFile = (name: string, size: number, type: string): File => {
      const file = new File(['x'], name, { type });

      Object.defineProperty(file, 'size', {
        value: size,
        writable: false,
      });

      return file;
    };

    test('returns empty arrays for null', () => {
      const result = validateFiles(null, { maxSize: 10, maxFiles: 5 });

      expect(result.valid).toEqual([]);
      expect(result.errors).toEqual([]);
    });

    test('validates files within the size limit', () => {
      const file = createMockFile('test.txt', 1024, 'text/plain'); // 1KB
      const files = [file] as any;

      const result = validateFiles(files, { maxSize: 10, maxFiles: 5 });

      expect(result.valid).toHaveLength(1);
      expect(result.valid[0]).toBe(file);
      expect(result.errors).toHaveLength(0);
    });

    test('rejects files that exceed maxSize', () => {
      const file = createMockFile('large.txt', 15 * 1024 * 1024, 'text/plain'); // 15MB
      const files = [file] as any;

      const result = validateFiles(files, { maxSize: 10, maxFiles: 5 });

      expect(result.valid).toHaveLength(0);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('size');
      expect(result.errors[0].file).toBe(file);
      expect(result.errors[0].message).toContain('exceeds 10MB');
    });

    test('accepts multiple files within the limit', () => {
      const file1 = createMockFile('file1.txt', 1024, 'text/plain');
      const file2 = createMockFile('file2.txt', 2048, 'text/plain');
      const files = [file1, file2] as any;

      const result = validateFiles(files, { maxSize: 10, maxFiles: 5 });

      expect(result.valid).toHaveLength(2);
      expect(result.errors).toHaveLength(0);
    });

    test('rejects files that exceed maxFiles', () => {
      const file1 = createMockFile('file1.txt', 1024, 'text/plain');
      const file2 = createMockFile('file2.txt', 1024, 'text/plain');
      const file3 = createMockFile('file3.txt', 1024, 'text/plain');
      const files = [file1, file2, file3] as any;

      const result = validateFiles(files, { maxSize: 10, maxFiles: 2 });

      expect(result.valid).toHaveLength(2);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('count');
      expect(result.errors[0].message).toContain('Maximum 2 files');
    });

    test('validates file type with specific accept', () => {
      const imageFile = createMockFile('image.png', 1024, 'image/png');
      const textFile = createMockFile('text.txt', 1024, 'text/plain');
      const files = [imageFile, textFile] as any;

      const result = validateFiles(files, {
        maxSize: 10,
        maxFiles: 5,
        accept: 'image/*',
      });

      expect(result.valid).toHaveLength(1);
      expect(result.valid[0]).toBe(imageFile);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('type');
      expect(result.errors[0].file).toBe(textFile);
    });

    test('validates multiple file types with accept', () => {
      const imageFile = createMockFile('image.png', 1024, 'image/png');
      const pdfFile = createMockFile('doc.pdf', 1024, 'application/pdf');
      const videoFile = createMockFile('video.mp4', 1024, 'video/mp4');
      const files = [imageFile, pdfFile, videoFile] as any;

      const result = validateFiles(files, {
        maxSize: 10,
        maxFiles: 5,
        accept: 'image/*, application/pdf',
      });

      expect(result.valid).toHaveLength(2);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].file).toBe(videoFile);
    });

    test('combines multiple errors correctly', () => {
      const largeFile = createMockFile('large.txt', 15 * 1024 * 1024, 'text/plain');
      const wrongType = createMockFile('video.mp4', 1024, 'video/mp4');
      const files = [largeFile, wrongType] as any;

      const result = validateFiles(files, {
        maxSize: 10,
        maxFiles: 5,
        accept: 'image/*',
      });

      expect(result.valid).toHaveLength(0);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].type).toBe('size');
      expect(result.errors[1].type).toBe('type');
    });
  });

  describe('formatFileSize', () => {
    test('formats 0 bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
    });

    test('formats bytes', () => {
      expect(formatFileSize(500)).toBe('500 Bytes');
    });

    test('formats KB', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB');
    });

    test('formats MB', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1.5 * 1024 * 1024)).toBe('1.5 MB');
    });

    test('formats GB', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
      expect(formatFileSize(2.5 * 1024 * 1024 * 1024)).toBe('2.5 GB');
    });

    test('formats TB', () => {
      expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe('1 TB');
    });

    test('handles negative numbers', () => {
      expect(formatFileSize(-100)).toBe('Invalid size');
    });

    test('round to 2 decimal places', () => {
      expect(formatFileSize(1234567)).toBe('1.18 MB');
    });
  });

  describe('getFileIcon', () => {
    const createFile = (type: string) => new File([''], 'test', { type });

    test('returns FileImageIcon for images', () => {
      const file = createFile('image/png');
      const icon = getFileIcon(file);

      expect(React.isValidElement(icon)).toBe(true);
      expect((icon as React.ReactElement).type).toBe(FileImageIcon);
    });

    test('returns FileVideoIcon for videos', () => {
      const file = createFile('video/mp4');
      const icon = getFileIcon(file);

      expect(React.isValidElement(icon)).toBe(true);
      expect((icon as React.ReactElement).type).toBe(FileVideoIcon);
    });

    test('returns FileAudioIcon for audio', () => {
      const file = createFile('audio/mp3');
      const icon = getFileIcon(file);

      expect(React.isValidElement(icon)).toBe(true);
      expect((icon as React.ReactElement).type).toBe(FileAudioIcon);
    });

    test('returns FileTextIcon for PDFs', () => {
      const file = createFile('application/pdf');
      const icon = getFileIcon(file);

      expect(React.isValidElement(icon)).toBe(true);
      expect((icon as React.ReactElement).type).toBe(FileTextIcon);
    });

    test('returns FileTextIcon for text', () => {
      const file = createFile('text/plain');
      const icon = getFileIcon(file);

      expect(React.isValidElement(icon)).toBe(true);
      expect((icon as React.ReactElement).type).toBe(FileTextIcon);
    });

    test('returns the default FileIcon for unknown types', () => {
      const file = createFile('application/octet-stream');
      const icon = getFileIcon(file);

      expect(React.isValidElement(icon)).toBe(true);
      expect((icon as React.ReactElement).type).toBe(FileIcon);
    });
  });

  describe('normalizeFileValue', () => {
    const file1 = new File([''], 'file1.txt');
    const file2 = new File([''], 'file2.txt');

    test('returns an empty array for null', () => {
      expect(normalizeFileValue(null)).toEqual([]);
    });

    test('returns an empty array for undefined', () => {
      expect(normalizeFileValue(undefined)).toEqual([]);
    });

    test('returns an array with a single element for File', () => {
      const result = normalizeFileValue(file1);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(file1);
    });

    test('returns the same array for File[]', () => {
      const files = [file1, file2];
      const result = normalizeFileValue(files);

      expect(result).toBe(files);
      expect(result).toHaveLength(2);
    });
  });

  describe('downloadFile', () => {
    let createObjectURLSpy: any;
    let revokeObjectURLSpy: any;

    beforeEach(() => {
      createObjectURLSpy = vi.fn(() => 'blob:mock-url');
      revokeObjectURLSpy = vi.fn();

      global.URL.createObjectURL = createObjectURLSpy;
      global.URL.revokeObjectURL = revokeObjectURLSpy;

      document.createElement = vi.fn(() => {
        const element = {
          href: '',
          download: '',
          click: vi.fn(),
        };
        return element as any;
      });

      document.body.appendChild = vi.fn();
      document.body.removeChild = vi.fn();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    test('creates a blob URL and revokes it afterwards', () => {
      const file = new File(['content'], 'test.txt');

      downloadFile(file);

      expect(createObjectURLSpy).toHaveBeenCalledWith(file);
      expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
    });

    test('create <a> element with correct attributes', () => {
      const file = new File(['content'], 'test.txt');
      const createElementSpy = vi.spyOn(document, 'createElement');

      downloadFile(file);

      expect(createElementSpy).toHaveBeenCalledWith('a');
    });

    test('revoke URL even if there is an error', () => {
      const file = new File(['content'], 'test.txt');

      document.createElement = vi.fn(() => {
        throw new Error('Click failed');
      });

      expect(() => downloadFile(file)).toThrow();
      expect(revokeObjectURLSpy).toHaveBeenCalled();
    });
  });
});
