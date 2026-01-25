import { EmptyStateIcon } from './emptyState.icons';

export interface EmptyStateBaseProps {
  title: string;
  description: string;
  iconName: EmptyStateIcon;
  className?: string;
  iconClassName?: string;
}
