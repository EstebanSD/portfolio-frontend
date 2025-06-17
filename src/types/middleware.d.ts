import type { Session } from 'next-auth';

declare module 'next/server' {
  interface NextRequest {
    auth: Session | null;
  }
}
