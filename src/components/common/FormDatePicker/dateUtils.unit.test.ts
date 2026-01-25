import { enUS, es } from 'date-fns/locale';
import { describe, test, expect } from 'vitest';
import { formatFormDate, formatFormDateForDisplay, parseFormDate } from './dateUtils';

describe('Date Utils (unit)', () => {
  describe('parseFormDate()', () => {
    test('returns undefined for false values', () => {
      expect(parseFormDate(null)).toBeUndefined();
      expect(parseFormDate(undefined)).toBeUndefined();
      expect(parseFormDate('')).toBeUndefined();
    });

    test('parse ISO string correctly', () => {
      const result = parseFormDate('2024-01-15');

      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(15);
    });

    test('returns undefined for invalid string', () => {
      expect(parseFormDate('invalid-date')).toBeUndefined();
    });

    test('handle existing date', () => {
      const date = new Date(2024, 0, 15);
      const result = parseFormDate(date);

      expect(result?.getTime()).toBe(date.getTime());
    });

    test('returns undefined for invalid Date', () => {
      const invalidDate = new Date('invalid');
      expect(parseFormDate(invalidDate)).toBeUndefined();
    });
  });

  describe('formatFormDate()', () => {
    test('format date in ISO format YYYY-MM-DD', () => {
      const date = new Date(2024, 0, 15);
      expect(formatFormDate(date)).toBe('2024-01-15');
    });

    test('add leading zeros', () => {
      const date = new Date(2024, 0, 5);
      expect(formatFormDate(date)).toBe('2024-01-05');
    });

    test('handle the end of the year correctly', () => {
      const date = new Date(2024, 11, 31);
      expect(formatFormDate(date)).toBe('2024-12-31');
    });
  });

  describe('formatFormDateForDisplay()', () => {
    test('formats ISO date using en-US locale', () => {
      const result = formatFormDateForDisplay('2026-01-01', enUS);

      expect(result).toBe('January 1st, 2026');
    });

    test('formats ISO date using es locale', () => {
      const result = formatFormDateForDisplay('2026-01-01', es);

      expect(result).toBe('1 de enero de 2026');
    });

    test('does not shift the day due to timezone', () => {
      const result = formatFormDateForDisplay('2026-01-01', enUS);

      expect(result).toContain('2026');
      expect(result).toContain('1');
    });
  });
});
