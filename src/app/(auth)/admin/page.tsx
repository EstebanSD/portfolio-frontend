import Link from 'next/link';
import { ReplyIcon } from 'lucide-react';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="space-y-8">
        <section>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your portfolio administration</p>
        </section>

        <div>
          <Button asChild>
            <Link href="/">
              <ReplyIcon className="w-5 h-5 mr-2" />
              <span>Go to Public Page</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
