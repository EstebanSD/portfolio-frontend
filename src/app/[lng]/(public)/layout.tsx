import { PublicHeader } from '@/components/header';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    // Adjusted padding to account for fixed header
    <div className="pt-16">
      <PublicHeader lng={lng} />
      {children}
    </div>
  );
}
