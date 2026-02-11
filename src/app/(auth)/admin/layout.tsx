import { cookies } from 'next/headers';
import { PrivateSidebar } from '@/components/auth';
import { AuthSessionProvider } from '@/components/providers';
import { SidebarProvider, SidebarTrigger } from '@/components/ui';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <AuthSessionProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <PrivateSidebar />
        <main className="pt-20 flex-1 flex flex-col min-h-screen overflow-hidden">
          <nav className="h-16 p-4 w-full border-b fixed top-0 z-50 bg-background">
            <SidebarTrigger />
          </nav>

          {/* Content */}
          <div className="p-4 min-h-full max-w-full overflow-x-hidden">
            <div className="w-full max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </AuthSessionProvider>
  );
}
