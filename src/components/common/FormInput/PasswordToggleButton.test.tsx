import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordToggleButton } from './PasswordToggleButton';

describe('PasswordToggleButton', () => {
  test('should render the button with the eye icon when showPassword is false.', () => {
    render(<PasswordToggleButton showPassword={false} onToggle={() => {}} disabled={false} />);

    const button = screen.getByRole('button', { name: /show password/i });
    expect(button).toBeInTheDocument();
  });

  test('should render crossed-out eye icon when showPassword is true', () => {
    render(<PasswordToggleButton showPassword={true} onToggle={() => {}} disabled={false} />);

    const button = screen.getByRole('button', { name: /hide password/i });
    expect(button).toBeInTheDocument();
  });

  test('should call onToggle when clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();

    render(<PasswordToggleButton showPassword={false} onToggle={mockToggle} disabled={false} />);

    const button = screen.getByRole('button', { name: /show password/i });
    await user.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('should disable the button when disabled is true', () => {
    render(<PasswordToggleButton showPassword={false} onToggle={() => {}} disabled={true} />);

    const button = screen.getByRole('button', { name: /show password/i });
    expect(button).toBeDisabled();
  });

  test('should not call onToggle when the button is disabled', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();

    render(<PasswordToggleButton showPassword={false} onToggle={mockToggle} disabled={true} />);

    const button = screen.getByRole('button', { name: /show password/i });
    await user.click(button);

    expect(mockToggle).not.toHaveBeenCalled();
  });

  test('should have type="button" to prevent form submission', () => {
    render(<PasswordToggleButton showPassword={false} onToggle={() => {}} disabled={false} />);

    const button = screen.getByRole('button', { name: /show password/i });
    expect(button).toHaveAttribute('type', 'button');
  });
});
