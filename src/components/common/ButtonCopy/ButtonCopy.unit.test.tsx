import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { useCopyToClipboard } from './useCopyToClipboard';
import { ButtonCopy } from './ButtonCopy';

vi.mock('./useCopyToClipboard', () => ({
  useCopyToClipboard: vi.fn(),
}));

const mockedUseCopyToClipboard = vi.mocked(useCopyToClipboard);

let mockCopy: (text: string) => Promise<void>;

function mockHookReturn(overrides?: Partial<ReturnType<typeof useCopyToClipboard>>) {
  mockedUseCopyToClipboard.mockReturnValue({
    isCopied: false,
    copy: mockCopy,
    error: null,
    reset: vi.fn(),
    ...overrides,
  });
}

describe('ButtonCopy (unit)', () => {
  beforeEach(() => {
    mockCopy = vi.fn().mockResolvedValue(undefined);
    vi.clearAllMocks();
    mockHookReturn({ isCopied: false });
  });

  describe('rendering', () => {
    test('should renders toCopy text by default', () => {
      render(<ButtonCopy toCopy="test@example.com" iconName="mail" />);

      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    test('should renders displayText when provided', () => {
      render(<ButtonCopy toCopy="test@example.com" iconName="mail" displayText="Email Address" />);

      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.queryByText('test@example.com')).toBeNull();
    });

    test('should sets correct aria-label using toCopy', () => {
      render(<ButtonCopy toCopy="test@example.com" iconName="mail" />);

      expect(screen.getByRole('button', { name: 'Copy test@example.com' })).toBeInTheDocument();
    });

    test('should sets correct aria-label using displayText', () => {
      render(<ButtonCopy toCopy="test@example.com" iconName="mail" displayText="Email" />);

      expect(screen.getByRole('button', { name: 'Copy Email' })).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    test('should calls copy with toCopy when clicked', async () => {
      const user = userEvent.setup();

      render(<ButtonCopy toCopy="test@example.com" iconName="mail" />);

      await user.click(screen.getByRole('button'));

      expect(mockCopy).toHaveBeenCalledWith('test@example.com');
      expect(mockCopy).toHaveBeenCalledTimes(1);
    });
  });

  describe('visual state', () => {
    test('should shows Copy icon when isCopied is false', () => {
      mockHookReturn({ isCopied: false });

      render(<ButtonCopy toCopy="test" iconName="mail" />);

      expect(screen.getByLabelText('Copy to clipboard')).toBeInTheDocument();
    });

    test('should shows Copied icon when isCopied is true', () => {
      mockHookReturn({ isCopied: true });

      render(<ButtonCopy toCopy="test" iconName="mail" />);

      expect(screen.getByLabelText('Copied')).toBeInTheDocument();
    });
  });

  describe('callbacks', () => {
    test('should passes onCopySuccess to hook', () => {
      const onCopySuccess = vi.fn();

      render(<ButtonCopy toCopy="test" iconName="mail" onCopySuccess={onCopySuccess} />);

      expect(useCopyToClipboard).toHaveBeenCalledTimes(1);
      expect(useCopyToClipboard).toHaveBeenCalledWith(
        expect.objectContaining({
          onSuccess: onCopySuccess,
        }),
      );
    });

    test('should passes onCopyError to hook', () => {
      const onCopyError = vi.fn();

      render(<ButtonCopy toCopy="test" iconName="mail" onCopyError={onCopyError} />);

      expect(useCopyToClipboard).toHaveBeenCalledWith(
        expect.objectContaining({
          onError: onCopyError,
        }),
      );
    });
  });

  describe('styling', () => {
    test('should applies custom className', () => {
      render(<ButtonCopy toCopy="test" iconName="mail" className="custom-class" />);

      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });
});
