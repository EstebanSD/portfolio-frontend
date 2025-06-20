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
    <>
      <PublicHeader lng={lng} />
      {/* Adjusted padding to account for fixed header */}
      <main className="pt-16">{children}</main>
    </>
  );
}
