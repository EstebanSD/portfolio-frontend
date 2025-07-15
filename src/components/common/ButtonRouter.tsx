'use client';

import * as React from 'react';
import { Button, type ButtonProps } from '@/components/ui';
import { useRouter } from 'next/navigation';

type ButtonRouteProps = ButtonProps & {
  action: 'push' | 'replace' | 'back' | 'forward' | 'refresh';
  href?: string;
};

export function ButtonRouter({ action, href, onClick, ...props }: ButtonRouteProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented) return;

    switch (action) {
      case 'push':
        if (href) router.push(href);
        else console.warn('Missing `href` for action "push"');
        break;
      case 'replace':
        if (href) router.replace(href);
        else console.warn('Missing `href` for action "replace"');
        break;
      case 'back':
        router.back();
        break;
      case 'forward':
        router.forward();
        break;
      case 'refresh':
        router.refresh();
        break;
    }
  };

  return <Button onClick={handleClick} {...props} />;
}
