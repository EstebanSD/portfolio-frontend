import { format, isValid, Locale, parseISO } from 'date-fns';

export function parseFormDate(value: unknown): Date | undefined {
  if (!value) return undefined;

  if (value instanceof Date) {
    return isValid(value) ? value : undefined;
  }

  if (typeof value === 'string') {
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : undefined;
  }

  return undefined;
}

export function formatFormDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatFormDateForDisplay(value: string, locale: Locale): string {
  return format(parseISO(value), 'PPP', { locale });
}
