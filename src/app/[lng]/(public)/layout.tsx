import { cookies } from 'next/headers';
import { PublicSidebar } from '@/components/header';
import { PublicFooter } from '@/components/footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <PublicSidebar lng={lng} />
      {/* Adjusted padding to account for fixed header */}
      <main className="w-full pt-16">
        <nav className="py-4 pl-4 w-full border-b fixed top-0 z-50 bg-background space-x-4 flex items-center">
          <SidebarTrigger />
          <span>Esteban Salvay Dilena</span>
        </nav>
        {children}
        <PublicFooter lng={lng} />
      </main>
    </SidebarProvider>
  );
}
