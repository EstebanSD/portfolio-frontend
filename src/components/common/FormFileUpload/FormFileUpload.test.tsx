// import { screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import {
  describe,
  expect,
  test,
  // vi,
  // beforeEach
} from 'vitest';
// import { FormFileUpload } from './FormFileUpload';
// import { renderWithForm } from '@/test/utils/renderWithForm';

// const createFile = (name: string, size: number, type: string): File => {
//   const file = new File(['a'.repeat(size)], name, { type });
//   return file;
// };

describe('<FormFileUpload /> (integration)', () => {
  // beforeEach(() => {
  //   global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
  //   global.URL.revokeObjectURL = vi.fn();
  // });

  test('TODO', () => {
    const todo = 'todo';
    expect(todo).toBeDefined();
  });
  // describe('file selection', () => {
  //   // test('allows you to select a file via input', async () => {
  //   //   const user = userEvent.setup();
  //   //   renderWithForm(<FormFileUpload name="file" />, {
  //   //     defaultValues: { file: null },
  //   //   });
  //   //   const input = screen.getByTestId('file-input-file');
  //   //   const file = createFile('test.txt', 1024, 'text/plain');
  //   //   await user.upload(input, file);
  //   //   expect(await screen.findByText('test.txt')).toBeInTheDocument();
  //   // });
  // });

  // describe('file mode', () => {
  //   // test('in single mode, replace previous file', async () => {
  //   //   const user = userEvent.setup();
  //   //   renderWithForm(<FormFileUpload name="file" showPreview />);
  //   //   const input = screen.getByTestId('file-input-file');
  //   //   await user.upload(input, createFile('a.txt', 1024, 'text/plain'));
  //   //   expect(await screen.findByText('a.txt')).toBeInTheDocument();
  //   //   await user.upload(input, createFile('b.txt', 1024, 'text/plain'));
  //   //   expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
  //   //   expect(await screen.findByText('b.txt')).toBeInTheDocument();
  //   // });
  //   // test('in multiple mode add files', async () => {
  //   //   const user = userEvent.setup();
  //   //   renderWithForm(<FormFileUpload name="files" multiple showPreview />);
  //   //   const input = screen.getByTestId('file-input-files');
  //   //   await user.upload(input, createFile('a.txt', 1024, 'text/plain'));
  //   //   await user.upload(input, createFile('b.txt', 1024, 'text/plain'));
  //   //   expect(await screen.findByText('a.txt')).toBeInTheDocument();
  //   //   expect(await screen.findByText('b.txt')).toBeInTheDocument();
  //   // });
  // });

  // describe('drag & drop', () => {
  //   // test('accepts files via drop', async () => {
  //   //   const { container } = renderWithForm(<FormFileUpload name="files" showPreview />);
  //   //   const file = createFile('dropped.txt', 1024, 'text/plain');
  //   //   const dropzone = container.firstChild as HTMLElement;
  //   //   fireEvent.drop(dropzone, {
  //   //     dataTransfer: { files: [file] },
  //   //   });
  //   //   expect(await screen.findByText('dropped.txt')).toBeInTheDocument();
  //   // });
  // });

  // describe('remove files', () => {
  //   // test('allows you to remove files from the preview', async () => {
  //   //   const user = userEvent.setup();
  //   //   renderWithForm(<FormFileUpload name="file" showPreview />);
  //   //   const input = screen.getByTestId('file-input-file');
  //   //   await user.upload(input, createFile('test.txt', 1024, 'text/plain'));
  //   //   expect(await screen.findByText('test.txt')).toBeInTheDocument();
  //   //   await user.click(screen.getByLabelText('remove-file'));
  //   //   expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
  //   // });
  // });
});
