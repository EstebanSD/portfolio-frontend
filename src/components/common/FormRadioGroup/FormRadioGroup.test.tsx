import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { renderWithForm } from '@/test/utils';
import { FormRadioGroup } from './FormRadioGroup';
import { type RadioOption } from './RadioOptionItem';

const OPTIONS: RadioOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

describe('<FormRadioGroup /> (integration)', () => {
  test('renders the group label and radio options', () => {
    renderWithForm(<FormRadioGroup name="gender" label="Gender" options={OPTIONS} />, {
      defaultValues: { gender: '' },
    });

    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
  });

  test('allows the user to select a radio option', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormRadioGroup name="gender" label="Gender" options={OPTIONS} />, {
      defaultValues: { gender: '' },
    });

    await user.click(screen.getByLabelText('Male'));

    expect(screen.getByLabelText('Male')).toBeChecked();
  });

  test('updates the selection when another option is chosen', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormRadioGroup name="gender" label="Gender" options={OPTIONS} />, {
      defaultValues: { gender: '' },
    });

    await user.click(screen.getByLabelText('Male'));
    await user.click(screen.getByLabelText('Female'));

    expect(screen.getByLabelText('Female')).toBeChecked();
    expect(screen.getByLabelText('Male')).not.toBeChecked();
  });

  test('reflects the initial value from react-hook-form', () => {
    renderWithForm(<FormRadioGroup name="gender" label="Gender" options={OPTIONS} />, {
      defaultValues: { gender: 'male' },
    });

    expect(screen.getByLabelText('Male')).toBeChecked();
  });

  test('does not allow interaction when disabled', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormRadioGroup name="gender" label="Gender" options={OPTIONS} disabled />);

    await user.click(screen.getByLabelText('Male'));

    expect(screen.getByLabelText('Male')).not.toBeChecked();
  });
});
