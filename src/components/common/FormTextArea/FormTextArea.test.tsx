import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { renderWithForm } from '@/test/utils';
import { FormTextArea } from './FormTextArea';

describe('<FormTextArea /> (integration)', () => {
  test('allows the user to type text', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTextArea name="description" />, { defaultValues: { description: '' } });

    const textarea = screen.getByRole('textbox');

    await user.type(textarea, 'Hello world');

    expect(textarea).toHaveValue('Hello world');
  });

  test('shows character counter when maxLength is provided', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTextArea name="description" maxLength={20} showCharCount />, {
      defaultValues: { description: '' },
    });

    const textarea = screen.getByRole('textbox');

    await user.type(textarea, 'Hello');

    expect(screen.getByText('5 / 20')).toBeInTheDocument();
  });

  test('does not allow typing beyond maxLength', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTextArea name="description" maxLength={5} />, {
      defaultValues: { description: '' },
    });

    const textarea = screen.getByRole('textbox');

    await user.type(textarea, '123456789');

    expect(textarea).toHaveValue('12345');
    expect(screen.getByText('5 / 5')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    renderWithForm(<FormTextArea name="description" disabled />, {
      defaultValues: { description: '' },
    });

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('calls auto resize logic on change when autoResize is enabled', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTextArea name="description" autoResize />, {
      defaultValues: { description: '' },
    });

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    const styleSpy = vi.spyOn(textarea.style, 'height', 'set');

    await user.type(textarea, 'Some text');

    expect(styleSpy).toHaveBeenCalled();
  });

  // NOTE:
  // autoResize relies on DOM layout (scrollHeight, computed styles)
  // which is not supported in JSDOM.
  // Behavior is covered by visual/manual testing.
});
