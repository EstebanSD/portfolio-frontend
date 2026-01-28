import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { renderWithForm } from '@/test/utils';
import { FormTagsInput } from './FormTagsInput';

describe('<FormTagsInput /> (integration)', () => {
  test('allows the user to add a tag by pressing Enter', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTagsInput name="tags" label="Tags" placeholder="Add tag" />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'react{enter}');

    expect(screen.getByText('react')).toBeInTheDocument();
  });

  test('clears the input after adding a tag', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTagsInput name="tags" label="Tags" placeholder="Add tag" />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'nextjs{enter}');

    expect(input).toHaveValue('');
  });

  test('does not add duplicate tags by default', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTagsInput name="tags" label="Tags" />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'react{enter}');
    await user.type(input, 'react{enter}');

    expect(screen.getAllByText('react')).toHaveLength(1);
  });

  test('allows duplicate tags when allowDuplicates is true', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTagsInput name="tags" label="Tags" allowDuplicates />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'react{enter}');
    await user.type(input, 'react{enter}');

    expect(screen.getAllByText('react')).toHaveLength(2);
  });

  test('allows the user to remove a tag by clicking the remove button', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTagsInput name="tags" label="Tags" />, {
      defaultValues: { tags: ['react', 'nextjs'] },
    });

    await user.click(screen.getByRole('button', { name: 'Remove react tag' }));

    expect(screen.queryByText('react')).not.toBeInTheDocument();
    expect(screen.getByText('nextjs')).toBeInTheDocument();
  });

  test('removes the last tag when pressing Backspace on empty input', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTagsInput name="tags" label="Tags" />, {
      defaultValues: { tags: ['react', 'nextjs'] },
    });

    const input = screen.getByRole('textbox');

    await user.click(input);
    await user.keyboard('{Backspace}');

    expect(screen.queryByText('nextjs')).not.toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  test('does not allow interaction when disabled', async () => {
    const user = userEvent.setup();

    renderWithForm(<FormTagsInput name="tags" label="Tags" disabled />, {
      defaultValues: { tags: ['react'] },
    });

    const input = screen.getByRole('textbox');

    await user.type(input, 'nextjs{enter}');

    expect(screen.queryByText('nextjs')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Remove react tag' }));

    expect(screen.getByText('react')).toBeInTheDocument();
  });
});
