import { PrivateSidebar } from '@/components/auth';
import { AuthSessionProvider } from '@/components/providers';
import { SidebarProvider, SidebarTrigger } from '@/components/ui';
import { cookies } from 'next/headers';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <AuthSessionProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <PrivateSidebar />
        <main className="w-full">
          <nav className="py-4 pl-4 w-full border-b fixed top-0 z-50 bg-background">
            <SidebarTrigger />
          </nav>
          {children}
        </main>
      </SidebarProvider>
    </AuthSessionProvider>
  );
}
