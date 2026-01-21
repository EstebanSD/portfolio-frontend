import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormInputLabel } from './FormInputLabel';

function FormWrapper({ children }: { children: React.ReactNode }) {
  const form = useForm();

  return <FormProvider {...form}>{children}</FormProvider>;
}

function renderWithForm(ui: React.ReactElement) {
  return render(ui, { wrapper: FormWrapper });
}

describe('FormInputLabel', () => {
  test('should not render anything when label is not provided', () => {
    const { container } = render(<FormInputLabel htmlFor="email" />);

    expect(container.firstChild).toBeNull();
  });

  test('should render the label text when label is provided', () => {
    renderWithForm(<FormInputLabel htmlFor="email" label="Email address" />);

    const labelText = screen.getByText('Email address');
    expect(labelText).toBeInTheDocument();
  });

  test('should associate the label with the input via htmlFor', () => {
    renderWithForm(<FormInputLabel htmlFor="email" label="Email" />);

    const labelText = screen.getByText('Email');
    const labelElement = labelText.closest('label');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'email');
  });

  test('should render required indicator when inputRequired is true', () => {
    renderWithForm(<FormInputLabel htmlFor="password" label="Password" inputRequired />);

    const labelText = screen.getByText('Password');
    const labelElement = labelText.closest('label');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('aria-required', 'true');
  });

  test('should render label icon when labelIcon is provided', () => {
    renderWithForm(
      <FormInputLabel
        htmlFor="username"
        label="Username"
        labelIcon={<span data-testid="label-icon" />}
      />,
    );

    const icon = screen.getByTestId('label-icon');
    expect(icon).toBeInTheDocument();
  });
});
