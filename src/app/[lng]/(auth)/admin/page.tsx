import Link from 'next/link';
import { Button } from '@/components/ui';
import { HomeIcon } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center mt-10 space-y-8">
      <section>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your portfolio administration</p>
      </section>

      <div>
        <Button asChild>
          <Link href="/">
            <HomeIcon className="w-5 h-5 mr-2" />
            <span>Go to Public Page</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
