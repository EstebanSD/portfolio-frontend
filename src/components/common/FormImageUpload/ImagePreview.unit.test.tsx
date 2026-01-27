/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { createFile } from '@/test/utils';
import { ImagePreview } from './ImagePreview';

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: any) => <img {...props} />,
}));

describe('<ImagePreview /> (unit)', () => {
  const files = [
    createFile({ name: 'image-1.png', type: 'image/png' }),
    createFile({ name: 'image-2.png', type: 'image/png' }),
  ];

  const previewUrls = {
    '0-image-1.png-1024': 'blob:preview-1',
    '1-image-2.png-1024': 'blob:preview-2',
  };

  test('returns null when files array is empty', () => {
    const { container } = render(
      <ImagePreview
        files={[]}
        multiple={false}
        previewUrls={{}}
        disabled={false}
        onRemove={vi.fn()}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders one preview per file when previewUrls exist', () => {
    render(
      <ImagePreview
        files={files}
        multiple
        previewUrls={previewUrls}
        disabled={false}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByAltText('image-1.png')).toBeInTheDocument();
    expect(screen.getByAltText('image-2.png')).toBeInTheDocument();
  });

  test('renders file names', () => {
    render(
      <ImagePreview
        files={files}
        multiple
        previewUrls={previewUrls}
        disabled={false}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText('image-1.png')).toBeInTheDocument();
    expect(screen.getByText('image-2.png')).toBeInTheDocument();
  });

  test('calls onRemove with correct index when clicking remove button', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <ImagePreview
        files={files}
        multiple
        previewUrls={previewUrls}
        disabled={false}
        onRemove={onRemove}
      />,
    );

    const removeButtons = screen.getAllByTestId('remove-image');

    await user.click(removeButtons[0]);

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(0);
  });

  test('does not call onRemove when disabled is true', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <ImagePreview
        files={files}
        multiple
        previewUrls={previewUrls}
        disabled
        onRemove={onRemove}
      />,
    );

    const removeButtons = screen.getAllByTestId('remove-image');

    expect(removeButtons[0]).toBeDisabled();

    await user.click(removeButtons[0]);

    expect(onRemove).not.toHaveBeenCalled();
  });

  test('renders single layout when multiple is false', () => {
    const { container } = render(
      <ImagePreview
        files={[files[0]]}
        multiple={false}
        previewUrls={{
          '0-image-1.png-1024': 'blob:preview-1',
        }}
        disabled={false}
        onRemove={vi.fn()}
      />,
    );

    expect(container.querySelectorAll('img').length).toBe(1);
  });
});
