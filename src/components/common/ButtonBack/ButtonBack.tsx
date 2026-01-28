'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../ui';

export function ButtonBack({
  fallbackHref,
  ...props
}: {
  fallbackHref: string;
} & React.ComponentProps<typeof Button>) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace(fallbackHref);
    }
  };

  return <Button {...props} onClick={handleClick} />;
}
