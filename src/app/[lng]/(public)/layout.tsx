import { PublicHeader } from '@/components/common';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16">
      <PublicHeader />
      {children}
    </div>
  );
}
