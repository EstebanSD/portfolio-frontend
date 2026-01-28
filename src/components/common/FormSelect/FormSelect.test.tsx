import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { renderWithForm } from '@/test/utils';
import { FormSelect, type SelectOption } from './FormSelect';

const OPTIONS: SelectOption[] = [
  { label: 'Argentina', value: 'ar' },
  { label: 'Brazil', value: 'br' },
];

describe('<FormSelect /> (integration)', () => {
  test('renders the label and placeholder', () => {
    renderWithForm(
      <FormSelect
        name="country"
        label="Country"
        placeholder="Select a country"
        options={OPTIONS}
      />,
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Select a country')).toBeInTheDocument();
  });

  test('allows the user to select an option', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormSelect name="country" label="Country" options={OPTIONS} />, {
      defaultValues: { country: 'br' },
    });

    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Argentina' }));

    expect(trigger).toHaveTextContent('Argentina');
  });

  test('reflects the initial value from react-hook-form', () => {
    renderWithForm(<FormSelect name="country" label="Country" options={OPTIONS} />, {
      defaultValues: { country: 'br' },
    });

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Brazil');
  });

  test('does not allow interaction when disabled', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormSelect name="country" label="Country" options={OPTIONS} disabled />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    expect(trigger).not.toHaveTextContent('Argentina');
  });

  test('shows an empty message when there are no options', async () => {
    const user = userEvent.setup();

    renderWithForm(
      <FormSelect name="country" label="Country" options={[]} emptyMessage="No countries" />,
    );

    await user.click(screen.getByRole('combobox'));

    expect(screen.getByText('No countries')).toBeInTheDocument();
  });
});
