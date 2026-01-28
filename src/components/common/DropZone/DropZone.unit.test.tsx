import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { createFile } from '@/test/utils';
import { DropZone } from './DropZone';

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
    test('display correct text for multiple files', () => {
      render(<DropZone {...defaultProps} />);

      expect(screen.getByText('Drag files here or')).toBeInTheDocument();
      expect(screen.getByText(/Max 5 files, 10MB each/)).toBeInTheDocument();
    });

    test('display correct text for single file', () => {
      render(<DropZone {...defaultProps} multiple={false} maxSize={5} />);

      expect(screen.getByText('Max 5MB')).toBeInTheDocument();
    });

    test('apply correct styles when dragOver is true', () => {
      const { container } = render(<DropZone {...defaultProps} dragOver={true} />);
      const dropzone = container.firstChild as HTMLElement;

      expect(dropzone).toHaveClass('border-primary', 'bg-primary/5');
    });

    test('apply correct styles when dragOver is false', () => {
      const { container } = render(<DropZone {...defaultProps} dragOver={false} />);
      const dropzone = container.firstChild as HTMLElement;

      expect(dropzone).toHaveClass('border-muted-foreground/25');
    });

    test('apply disabled styles when disabled', () => {
      const { container } = render(<DropZone {...defaultProps} disabled={true} />);
      const dropzone = container.firstChild as HTMLElement;

      expect(dropzone).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    test('disable the input when disabled prop is true', () => {
      render(<DropZone {...defaultProps} disabled={true} />);

      const input = screen.getByTestId(`file-input-${defaultProps.name}`);
      expect(input).toBeDisabled();
    });

    test('render custom icon when provided', () => {
      const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
      render(<DropZone {...defaultProps} icon={customIcon} />);

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    test('render custom texts when provided', () => {
      render(
        <DropZone
          {...defaultProps}
          dragText={'Drag images here or'}
          selectText={'select images'}
          itemLabel={'image'}
        />,
      );

      expect(screen.getByText('Drag images here or')).toBeInTheDocument();
      expect(screen.getByText(/select images/i)).toBeInTheDocument();
      expect(screen.getByText(/Max 5 images/)).toBeInTheDocument();
    });
  });

  describe('behavior', () => {
    test('call onChange when input fires change event', async () => {
      const onChange = vi.fn();

      render(<DropZone {...defaultProps} onChange={onChange} />);

      const input = screen.getByTestId(`file-input-${defaultProps.name}`);

      const file = createFile();

      fireEvent.change(input, {
        target: { files: [file] },
      });

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('call onDragOver when dragging over dropzone', () => {
      const onDragOver = vi.fn();
      const { container } = render(<DropZone {...defaultProps} onDragOver={onDragOver} />);
      const dropzone = container.firstChild as HTMLElement;

      fireEvent.dragOver(dropzone);

      expect(onDragOver).toHaveBeenCalledTimes(1);
    });

    test('call onDragLeave when drag leaves dropzone', () => {
      const onDragLeave = vi.fn();
      const { container } = render(<DropZone {...defaultProps} onDragLeave={onDragLeave} />);
      const dropzone = container.firstChild as HTMLElement;

      fireEvent.dragLeave(dropzone);

      expect(onDragLeave).toHaveBeenCalledTimes(1);
    });

    test('call onDrop when files are dropped', () => {
      const onDrop = vi.fn();
      const { container } = render(<DropZone {...defaultProps} onDrop={onDrop} />);
      const dropzone = container.firstChild as HTMLElement;

      const file = createFile();
      fireEvent.drop(dropzone, {
        dataTransfer: { files: [file] },
      });

      expect(onDrop).toHaveBeenCalledTimes(1);
    });

    test('not show drag over styles when disabled even if dragOver prop is true', () => {
      const { container } = render(<DropZone {...defaultProps} disabled dragOver={true} />);
      const dropzone = container.firstChild as HTMLElement;

      expect(dropzone).not.toHaveClass('border-primary');
      expect(dropzone).toHaveClass('opacity-50');
    });
  });
});
