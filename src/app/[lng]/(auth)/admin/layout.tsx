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
        <main className="flex-1 overflow-auto pt-16">
          <nav className="py-4 pl-4 w-full border-b fixed top-0 z-50 bg-background">
            <SidebarTrigger />
          </nav>

          {/* Content */}
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </AuthSessionProvider>
  );
}
