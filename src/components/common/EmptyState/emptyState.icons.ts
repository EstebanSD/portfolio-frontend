import { AlertTriangleIcon, BanIcon, InboxIcon, SearchXIcon } from 'lucide-react';

export type EmptyStateIcon = 'ban' | 'alert' | 'search' | 'inbox';

export const emptyIconMap = {
  ban: BanIcon,
  alert: AlertTriangleIcon,
  search: SearchXIcon,
  inbox: InboxIcon,
} satisfies Record<EmptyStateIcon, React.ElementType>;
