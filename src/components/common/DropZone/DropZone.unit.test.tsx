import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { DropZone } from './DropZone';

const createFile = (name: string, size: number, type: string): File => {
  const file = new File(['a'.repeat(size)], name, { type });
  return file;
};

describe('<DropZone /> (unit)', () => {
  const defaultProps = {
    name: 'files',
    dragOver: false,
    disabled: false,
    multiple: true,
    maxFiles: 5,
    maxSize: 10,
    onDragOver: vi.fn(),
    onDragLeave: vi.fn(),
    onDrop: vi.fn(),
    onChange: vi.fn(),
  };

  describe('render', () => {
    test('display correct text', () => {
      render(<DropZone {...defaultProps} />);

      expect(screen.getByText('Drag files here or')).toBeInTheDocument();
      expect(screen.getByText(/Max 5 files, 10MB each/)).toBeInTheDocument();
    });

    test('display correct text for single file', () => {
      render(<DropZone {...defaultProps} multiple={false} maxSize={5} />);

      expect(screen.getByText('Max 5MB')).toBeInTheDocument();
    });

    test('disable the input file', () => {
      render(<DropZone {...defaultProps} disabled={true} />);

      const input = screen.getByTestId(`file-input-${defaultProps.name}`);
      expect(input).toBeDisabled();
    });
  });

  describe('behavior', () => {
    test('clicking "select files" triggers file input click', async () => {
      const user = userEvent.setup();
      render(<DropZone {...defaultProps} />);

      const button = screen.getByText(/select files/i);
      const input = screen.getByTestId(`file-input-${defaultProps.name}`);

      const clickSpy = vi.spyOn(input, 'click');

      await user.click(button);

      expect(clickSpy).toHaveBeenCalled();
    });

    test('not accept files when is disabled', () => {
      const { container } = render(<DropZone {...defaultProps} disabled />);

      const file = createFile('test.txt', 1024, 'text/plain');
      const dropzone = container.firstChild as HTMLElement;

      fireEvent.drop(dropzone, {
        dataTransfer: { files: [file] },
      });

      expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
    });
  });
});
