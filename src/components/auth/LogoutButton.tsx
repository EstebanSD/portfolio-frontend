'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '../ui';

export function LogoutButton() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      if (session?.accessToken) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      await signOut({ callbackUrl: '/' });
    }
  };

  return (
    <Button onClick={handleLogout} className="w-full" variant={'outline'}>
      Logout
    </Button>
  );
}
