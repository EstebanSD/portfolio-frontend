import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordToggleButton } from './PasswordToggleButton';

describe('<PasswordToggleButton /> (unit)', () => {
  test.each([
    [false, /show password/i],
    [true, /hide password/i],
  ])('should render correct aria-label when showPassword=%s', (showPassword, label) => {
    render(
      <PasswordToggleButton showPassword={showPassword} onToggle={() => {}} disabled={false} />,
    );

    expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
  });

  test('should call onToggle when clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();

    render(<PasswordToggleButton showPassword={false} onToggle={mockToggle} disabled={false} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('should disable the button when disabled is true', () => {
    render(<PasswordToggleButton showPassword={false} onToggle={() => {}} disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('should not call onToggle when the button is disabled', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();

    render(<PasswordToggleButton showPassword={false} onToggle={mockToggle} disabled={true} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggle).not.toHaveBeenCalled();
  });

  test('should have type="button" to prevent form submission', () => {
    render(<PasswordToggleButton showPassword={false} onToggle={() => {}} disabled={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
