/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from './FormInput';

function renderWithForm(ui: React.ReactElement, { defaultValues }: { defaultValues?: any } = {}) {
  function Wrapper() {
    const methods = useForm({ defaultValues });

    return (
      <FormProvider {...methods}>
        <form>{ui}</form>
      </FormProvider>
    );
  }

  return render(<Wrapper />);
}

describe('FormInput - Integration Tests', () => {
  describe('initial state', () => {
    test('should render basic text input', () => {
      renderWithForm(<FormInput name="username" label="Username" placeholder="Enter Username" />);

      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    });

    test('should display an asterisk when required is true', () => {
      const { container } = renderWithForm(<FormInput name="email" label="Email" required />);

      const icon = container.querySelector('.lucide-asterisk');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('text-destructive');
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
