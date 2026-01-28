import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { ButtonBack } from './ButtonBack';

const mockBack = vi.fn();
const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
    replace: mockReplace,
  }),
}));

function setHistoryLength(value: number) {
  Object.defineProperty(window.history, 'length', {
    configurable: true,
    value,
  });
}

describe('<ButtonBack /> (unit)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('calls router.back when history length is greater than 1', async () => {
    setHistoryLength(2);
    const user = userEvent.setup();

    render(<ButtonBack fallbackHref="/home">Back</ButtonBack>);

    await user.click(screen.getByRole('button'));

    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockReplace).not.toHaveBeenCalled();
  });

  test('calls router.replace with fallbackHref when history length is 1', async () => {
    setHistoryLength(1);
    const user = userEvent.setup();

    render(<ButtonBack fallbackHref="/home">Back</ButtonBack>);

    await user.click(screen.getByRole('button'));

    expect(mockReplace).toHaveBeenCalledWith('/home');
    expect(mockBack).not.toHaveBeenCalled();
  });

  test('forwards props to Button', () => {
    render(
      <ButtonBack fallbackHref="/home" aria-label="Go back">
        Back
      </ButtonBack>,
    );

    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
  });
});
