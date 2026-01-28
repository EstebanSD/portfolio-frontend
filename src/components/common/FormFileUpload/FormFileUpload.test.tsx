import { screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { createFile, renderWithForm } from '@/test/utils';
import { FormFileUpload } from './FormFileUpload';

describe('<FormFileUpload /> (integration)', () => {
  const defaultProps = {
    name: 'file',
    label: 'Files',
    labelIcon: null,
    required: false,
    disabled: false,
    multiple: false,
    maxFiles: 5,
    maxSize: 10,
    accept: 'application/pdf',
  };

  test('allows selecting a file and shows it in the preview', () => {
    renderWithForm(<FormFileUpload {...defaultProps} />);

    const input = screen.getByTestId('file-input-file');
    const file = createFile();

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  test('replaces the previous file in single mode', () => {
    renderWithForm(<FormFileUpload {...defaultProps} />);

    const input = screen.getByTestId('file-input-file');

    fireEvent.change(input, {
      target: { files: [createFile({ name: 'first.pdf' })] },
    });

    fireEvent.change(input, {
      target: { files: [createFile({ name: 'second.pdf' })] },
    });

    expect(screen.queryByText('first.pdf')).not.toBeInTheDocument();
    expect(screen.getByText('second.pdf')).toBeInTheDocument();
  });

  test('adds files incrementally in multiple mode', () => {
    renderWithForm(<FormFileUpload {...defaultProps} name="files" multiple />);

    const input = screen.getByTestId('file-input-files');

    fireEvent.change(input, {
      target: { files: [createFile({ name: 'a.pdf' })] },
    });

    fireEvent.change(input, {
      target: { files: [createFile({ name: 'b.pdf' })] },
    });

    expect(screen.getByText('a.pdf')).toBeInTheDocument();
    expect(screen.getByText('b.pdf')).toBeInTheDocument();
  });

  test('allows you to remove files from the preview', () => {
    renderWithForm(<FormFileUpload {...defaultProps} />);
    const input = screen.getByTestId('file-input-file');

    const file = createFile();
    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('remove-file'));

    expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
  });
});
