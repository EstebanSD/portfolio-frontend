import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { renderWithForm } from '@/test/utils';
import { FormInput } from './FormInput';

describe('<FormInput /> (react-hook-form integration)', () => {
  describe('initial state', () => {
    test('should render basic text input', () => {
      renderWithForm(<FormInput name="username" label="Username" placeholder="Enter Username" />);

      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    });

    test('password input should render with type="password"', () => {
      renderWithForm(<FormInput name="password" label="Password" type="password" />);

      const input = screen.getByLabelText(/password/i, { selector: 'input' });
      expect(input).toHaveAttribute('type', 'password');
    });

    test('input should render with inputMode="numeric"', () => {
      renderWithForm(<FormInput name="phone" type="tel" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('inputmode', 'numeric');
    });

    test('email input should have the correct type attribute', () => {
      renderWithForm(<FormInput name="email" type="email" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    test('should disable input and button when disabled is true', () => {
      renderWithForm(<FormInput name="password" label="Password" type="password" disabled />);

      const input = screen.getByLabelText(/password/i, { selector: 'input' });
      const button = screen.getByRole('button');

      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });
  });

  describe('Password toggle (integration)', () => {
    test('toggle should change the input type from password to text', async () => {
      const user = userEvent.setup();

      renderWithForm(<FormInput name="password" label="Password" type="password" />);

      const input = screen.getByLabelText(/password/i, { selector: 'input' });
      const toggleButton = screen.getByRole('button');

      expect(input).toHaveAttribute('type', 'password');

      await user.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');

      await user.click(toggleButton);
      expect(input).toHaveAttribute('type', 'password');
    });

    test('button should NOT be displayed when showIconPassword is false', () => {
      renderWithForm(<FormInput name="password" type="password" showIconPassword={false} />);

      expect(screen.queryByRole('button')).toBeNull();
    });
  });

  describe('when use react-hook-form', () => {
    test('should update the value of the form when the user types', async () => {
      const user = userEvent.setup();

      renderWithForm(<FormInput name="email" label="Email" />, {
        defaultValues: { email: '' },
      });

      const input = screen.getByLabelText(/email/i);
      await user.type(input, 'test@example.com');

      expect(input).toHaveValue('test@example.com');
    });
  });
});
