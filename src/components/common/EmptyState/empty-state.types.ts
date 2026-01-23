import { EmptyStateIcon } from './empty-state.icons';

export interface EmptyStateBaseProps {
  title: string;
  description: string;
  iconName: EmptyStateIcon;
  className?: string;
  iconClassName?: string;
}
