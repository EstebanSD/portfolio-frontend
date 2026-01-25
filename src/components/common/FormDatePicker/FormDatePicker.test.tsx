import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { renderWithForm } from '@/test/utils/renderWithForm';
import { FormDatePicker } from './FormDatePicker';

vi.mock('../../ui/calendar', () => ({
  Calendar: ({ onSelect }: { onSelect: (date: Date) => void }) => (
    <button data-testid="mock-calendar-day" onClick={() => onSelect(new Date(2026, 0, 15))}>
      Select Jan 15
    </button>
  ),
}));

describe('<FormDatePicker /> (integration)', () => {
  test('renders placeholder when no value is set', () => {
    renderWithForm(<FormDatePicker name="date" label="Date" />);

    expect(screen.getByText('Select date')).toBeInTheDocument();
  });

  test('renders formatted date when value is provided', () => {
    renderWithForm(<FormDatePicker name="date" />, {
      defaultValues: {
        date: '2026-01-01',
      },
    });

    expect(screen.getByText('January 1st, 2026')).toBeInTheDocument();
  });

  test('updates form value as string when date is selected', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormDatePicker name="date" />);

    await user.click(screen.getByRole('button', { name: /select date/i }));

    await user.click(screen.getByTestId('mock-calendar-day'));

    expect(screen.getByText('January 15th, 2026')).toBeInTheDocument();
  });
});
