import { screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi, beforeAll } from 'vitest';
import { createFile, renderWithForm } from '@/test/utils';
import { FormImageUpload } from './FormImageUpload';

describe('<FormImageUpload /> (integration)', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  test('renders dropzone and label', () => {
    renderWithForm(<FormImageUpload name="images" label="Images" />);

    expect(screen.getByText('Images')).toBeInTheDocument();
    expect(screen.getByText(/select images/i)).toBeInTheDocument();
  });

  test('sets a single file when multiple is false', () => {
    const file = createFile({ name: 'photo.png', type: 'image/png' });

    renderWithForm(<FormImageUpload name="images" />);

    const input = screen.getByTestId('file-input-images');
    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(screen.getByText('photo.png')).toBeInTheDocument();
  });

  test('accumulates files when multiple is true', () => {
    const file1 = createFile({ name: 'photo1.png', type: 'image/png' });
    const file2 = createFile({ name: 'photo2.png', type: 'image/png' });

    renderWithForm(<FormImageUpload name="images" multiple />);

    const input = screen.getByTestId('file-input-images');

    fireEvent.change(input, { target: { files: [file1] } });
    fireEvent.change(input, { target: { files: [file2] } });

    expect(screen.getByText('photo1.png')).toBeInTheDocument();
    expect(screen.getByText('photo2.png')).toBeInTheDocument();
  });

  test('removes file when clicking remove button', () => {
    const file = createFile({ name: 'photo.png', type: 'image/png' });

    renderWithForm(<FormImageUpload name="images" />);

    const input = screen.getByTestId('file-input-images');
    fireEvent.change(input, { target: { files: [file] } });

    const removeButton = screen.getByTestId('remove-image');
    fireEvent.click(removeButton);

    expect(screen.queryByText('photo.png')).not.toBeInTheDocument();
  });

  test('does not allow selecting files when disabled', () => {
    const file = createFile({ name: 'photo.png', type: 'image/png' });

    renderWithForm(<FormImageUpload name="images" disabled />);

    const input = screen.getByTestId('file-input-images');
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.queryByText('photo.png')).not.toBeInTheDocument();
  });

  test('does not render preview when showImagePreview is false', () => {
    const file = createFile({ name: 'photo.png', type: 'image/png' });

    renderWithForm(<FormImageUpload name="images" showImagePreview={false} />);

    const input = screen.getByTestId('file-input-images');
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.queryByText('photo.png')).not.toBeInTheDocument();
  });
});
