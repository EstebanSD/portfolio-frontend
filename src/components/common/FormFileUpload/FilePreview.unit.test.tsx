import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilePreview } from './FilePreview';

describe('<FilePreview /> (unit)', () => {
  const file1 = new File(['content'], 'test1.txt', { type: 'text/plain' });
  const file2 = new File(['content'], 'test2.txt', { type: 'text/plain' });

  const defaultProps = {
    files: [file1, file2],
    allowDownload: false,
    disabled: false,
    onRemove: vi.fn(),
  };

  describe('render', () => {
    test('display file list', () => {
      render(<FilePreview {...defaultProps} />);

      expect(screen.getByText('test1.txt')).toBeInTheDocument();
      expect(screen.getByText('test2.txt')).toBeInTheDocument();
    });

    test('NOT display anything if files is empty', () => {
      const { container } = render(<FilePreview {...defaultProps} files={[]} />);

      expect(container.firstChild).toBeNull();
    });

    test('display download button when allowDownload is true', () => {
      const onDownload = vi.fn();
      render(<FilePreview {...defaultProps} allowDownload onDownload={onDownload} />);

      const downloadButtons = screen.getAllByLabelText(/download/i);
      expect(downloadButtons.length).toBe(2);
    });

    test('NOT display download button when allowDownload is false', () => {
      render(<FilePreview {...defaultProps} allowDownload={false} />);

      const downloadButtons = screen.queryAllByLabelText(/download/i);
      expect(downloadButtons.length).toBe(0);
    });
  });

  describe('behavior', () => {
    test('call onRemove with the correct index', async () => {
      const user = userEvent.setup();
      const onRemove = vi.fn();

      render(<FilePreview {...defaultProps} onRemove={onRemove} />);

      const removeButtons = screen.getAllByLabelText(/remove/i);
      await user.click(removeButtons[0]);

      expect(onRemove).toHaveBeenCalledWith(0);
    });

    test('call onDownload with the correct file', async () => {
      const user = userEvent.setup();
      const onDownload = vi.fn();

      render(<FilePreview {...defaultProps} allowDownload onDownload={onDownload} />);

      const downloadButtons = screen.getAllByLabelText(/download/i);
      await user.click(downloadButtons[1]);

      expect(onDownload).toHaveBeenCalledWith(file2);
    });

    test('disables buttons when disabled is true', () => {
      render(<FilePreview {...defaultProps} disabled />);

      const removeButtons = screen.getAllByLabelText(/remove/i);
      removeButtons.forEach((button) => {
        expect(button.closest('button')?.disabled).toBe(true);
      });
    });
  });
});
