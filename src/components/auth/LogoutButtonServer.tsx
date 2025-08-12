import { logoutAction } from '@/actions/auth';
import { auth } from '@/auth';

export async function LogoutButtonServer() {
  const session = await auth();

  if (!session) return null;

  return (
    <form action={logoutAction} className="w-full flex items-center justify-center">
      <button type="submit" className="px-3 py-1 text-sm text-destructive group-hover:text-white">
        Log out
      </button>
    </form>
  );
}
