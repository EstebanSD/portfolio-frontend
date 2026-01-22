import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderWithForm } from '@/test/utils/renderWithForm';
import { FormInputLabel } from './FormInputLabel';

describe('FormInputLabel (react-hook-form integration)', () => {
  test('should not render anything when label is not provided', () => {
    const { container } = render(<FormInputLabel htmlFor="email" />);

    expect(container.firstChild).toBeNull();
  });

  test('should render the label text when label is provided', () => {
    renderWithForm(<FormInputLabel htmlFor="email" label="Email address" />);

    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  test('should pass htmlFor to FormLabel', () => {
    renderWithForm(<FormInputLabel htmlFor="email" label="Email" />);

    const labelText = screen.getByText('Email');
    const labelElement = labelText.closest('label');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'email');
  });

  test('should set aria-required when inputRequired is true', () => {
    renderWithForm(<FormInputLabel htmlFor="password" label="Password" inputRequired />);

    const labelText = screen.getByText('Password');
    const labelElement = labelText.closest('label');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('aria-required', 'true');
  });

  test('should render label icon when provided', () => {
    renderWithForm(
      <FormInputLabel
        htmlFor="username"
        label="Username"
        labelIcon={<span data-testid="label-icon" />}
      />,
    );

    expect(screen.getByTestId('label-icon')).toBeInTheDocument();
  });

  test('should display an asterisk icon when inputRequired is true', () => {
    const { container } = renderWithForm(
      <FormInputLabel htmlFor="password" label="Password" inputRequired />,
    );

    const icon = container.querySelector('.lucide-asterisk');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-destructive');
  });
});
