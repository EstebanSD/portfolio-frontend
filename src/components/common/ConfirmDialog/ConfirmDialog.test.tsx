import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ConfirmDialog } from './ConfirmDialog';

function renderWithUser(ui: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}

describe('<ConfirmDialog />', () => {
  describe('trigger (uncontrolled mode)', () => {
    test('opens when trigger is clicked and closes on confirm', async () => {
      const onConfirm = vi.fn();

      const { user } = renderWithUser(
        <ConfirmDialog
          title="Delete project"
          description="Are you sure?"
          confirmLabel="Delete"
          onConfirm={onConfirm}
          trigger={<button>Open dialog</button>}
        />,
      );

      // dialog should not be visible initially
      expect(screen.queryByText('Delete project')).not.toBeInTheDocument();

      await user.click(screen.getByText('Open dialog'));

      expect(screen.getByText('Delete project')).toBeInTheDocument();
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();

      // confirm
      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(onConfirm).toHaveBeenCalledOnce();

      // dialog should close
      await waitFor(() => {
        expect(screen.queryByText('Delete project')).not.toBeInTheDocument();
      });
    });
  });

  describe('controlled mode', () => {
    test('renders open when open=true and calls onOpenChange on cancel', async () => {
      const onOpenChange = vi.fn();
      const onConfirm = vi.fn();

      const { user } = renderWithUser(
        <ConfirmDialog
          title="Delete translation"
          description="Are you sure?"
          open={true}
          onOpenChange={onOpenChange}
          onConfirm={onConfirm}
        />,
      );

      expect(screen.getByText('Delete translation')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(onConfirm).not.toHaveBeenCalled();
    });

    test('calls onConfirm and then onOpenChange(false) on confirm', async () => {
      const onOpenChange = vi.fn();
      const onConfirm = vi.fn();

      const { user } = renderWithUser(
        <ConfirmDialog
          title="Delete translation"
          description="Are you sure?"
          open={true}
          onOpenChange={onOpenChange}
          confirmLabel="Confirm delete"
          onConfirm={onConfirm}
        />,
      );

      await user.click(screen.getByRole('button', { name: 'Confirm delete' }));

      expect(onConfirm).toHaveBeenCalledOnce();
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('loading state', () => {
    test('disables buttons when loading is true', async () => {
      const onConfirm = vi.fn();

      render(
        <ConfirmDialog
          title="Processing"
          description="Are you sure?"
          loading={true}
          onConfirm={onConfirm}
          trigger={<button>Open</button>}
        />,
      );

      await userEvent.click(screen.getByText('Open'));

      const confirmButton = screen.getByRole('button', { name: /processing/i });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(confirmButton).toBeDisabled();
      expect(cancelButton).toBeDisabled();
    });
  });

  describe('accessibility basics', () => {
    test('renders an accessible title and confirm button', async () => {
      render(
        <ConfirmDialog
          title="Accessible title"
          description="Are you sure?"
          onConfirm={() => {}}
          trigger={<button>Open</button>}
        />,
      );

      await userEvent.click(screen.getByText('Open'));

      expect(screen.getByRole('heading', { name: 'Accessible title' })).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });
  });
});
