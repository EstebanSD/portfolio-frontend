'use client';

import { useState } from 'react';
import { Button } from '../ui';
import { CheckIcon, CopyIcon, MailIcon, PhoneIcon, LinkedinIcon, GlobeIcon } from 'lucide-react';
import { SiGithub, SiX, SiInstagram } from 'react-icons/si';
import { cn } from '@/lib/shadcn/utils';

const ICON_MAP = {
  mail: MailIcon,
  phone: PhoneIcon,
  github: SiGithub,
  linkedin: LinkedinIcon, // TODO update icon
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
}

export function ButtonCopy({ toCopy, iconName, displayText, className }: ButtonCopyProps) {
  const [copied, setCopied] = useState(false);
  const Icon = ICON_MAP[iconName];
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying:', err);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={copyToClipboard}
      className={cn(
        'flex items-center space-x-2 transition-colors h-auto p-0 group cursor-pointer',
        className,
      )}
      aria-label={`Copy ${displayText || toCopy}`}
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground group-hover:text-primary transition-colors">
        {displayText || toCopy}
      </span>
      {copied ? (
        <CheckIcon className="h-3 w-3 text-green-500" />
      ) : (
        <CopyIcon className="h-3 w-3 opacity-50" />
      )}
    </Button>
  );
}
