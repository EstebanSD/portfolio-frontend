import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { FileIcon } from 'lucide-react';
import { Spinner } from './Spinner';

describe('<Spinner /> (unit)', () => {
  describe('loading state', () => {
    test('renders status role when loading', () => {
      render(<Spinner loading text="Submit" />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('shows loadingText when provided', () => {
      render(<Spinner loading text="Submit" loadingText="Submitting..." />);

      expect(screen.getByText('Submitting...')).toBeInTheDocument();
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });

    test('falls back to text when loadingText is not provided', () => {
      render(<Spinner loading text="Submit" />);

      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    test('sets aria-busy when loading', () => {
      render(<Spinner loading text="Submit" />);

      const statusElement = screen.getByRole('status');
      expect(statusElement).toHaveAttribute('aria-busy', 'true');
    });

    test('does not render custom icon when loading', () => {
      render(<Spinner loading text="Submit" icon={<FileIcon data-testid="custom-icon" />} />);

      expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
    });
  });

  describe('idle state', () => {
    test('renders text without status role when not loading', () => {
      render(<Spinner loading={false} text="Submit" />);

      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    test('renders custom icon when provided and not loading', () => {
      render(
        <Spinner loading={false} text="Submit" icon={<FileIcon data-testid="custom-icon" />} />,
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });
});
