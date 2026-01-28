'use client';

import { CheckIcon, CopyIcon, MailIcon, PhoneIcon, LinkedinIcon, GlobeIcon } from 'lucide-react';
import { SiGithub, SiX, SiInstagram } from 'react-icons/si';
import { cn } from '@/lib/shadcn/utils';
import { Button } from '../../ui';
import { useCopyToClipboard } from './useCopyToClipboard';

const ICON_MAP = {
  mail: MailIcon,
  phone: PhoneIcon,
  github: SiGithub,
  linkedin: LinkedinIcon,
  twitter: SiX,
  instagram: SiInstagram,
  website: GlobeIcon,
} as const;

type IconName = keyof typeof ICON_MAP;

interface ButtonCopyProps {
  toCopy: string;
  iconName: IconName;
  displayText?: string;
  className?: string;
  onCopySuccess?: (text: string) => void;
  onCopyError?: (error: Error) => void;
}

export function ButtonCopy({
  toCopy,
  iconName,
  displayText,
  className,
  onCopySuccess,
  onCopyError,
}: ButtonCopyProps) {
  const { isCopied, copy } = useCopyToClipboard({
    resetInterval: 2000,
    onSuccess: onCopySuccess,
    onError: onCopyError,
  });

  const Icon = ICON_MAP[iconName];

  const handleClick = () => {
    copy(toCopy);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        'flex items-center space-x-2 transition-colors h-auto p-0 group cursor-pointer',
        className,
      )}
      aria-label={`Copy ${displayText || toCopy}`}
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground group-hover:text-accent transition-colors">
        {displayText || toCopy}
      </span>
      {isCopied ? (
        <CheckIcon className="h-3 w-3 text-green-500" aria-label="Copied" />
      ) : (
        <CopyIcon className="h-3 w-3 opacity-50" aria-label="Copy to clipboard" />
      )}
    </Button>
  );
}
