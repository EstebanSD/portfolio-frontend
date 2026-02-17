import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { renderWithForm } from '@/test/utils';
import { FormSwitch } from './FormSwitch';

describe('<FormSwitch /> (integration)', () => {
  const defaultProps = {
    name: 'enabled',
    label: 'Enable feature',
  };

  test('reflects the default value from the form', () => {
    renderWithForm(<FormSwitch {...defaultProps} />, {
      defaultValues: { enabled: true },
    });

    const switchElement = screen.getByRole('switch');

    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  test('toggles value when clicked', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormSwitch {...defaultProps} />, {
      defaultValues: { enabled: false },
    });

    const switchElement = screen.getByRole('switch');

    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    await user.click(switchElement);

    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  test('does not toggle when disabled', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormSwitch {...defaultProps} disabled />, {
      defaultValues: { enabled: false },
    });

    const switchElement = screen.getByRole('switch');

    await user.click(switchElement);

    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });
});
