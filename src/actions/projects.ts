'use server';

// import { ZodError } from 'zod';
// import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { ProjectWithTranslations } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
export async function fetchProjectsAction() {
  const session = await auth();

  try {
    const res = await fetch(`${API_URL}/portfolio/projects/all`, {
      cache: 'force-cache',
      next: {
        revalidate: 3600,
        tags: ['projects-all'],
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data: ProjectWithTranslations[] = await res.json();

    return data;
  } catch (error) {
    console.error('Error during fetching data', error);
    throw new Error('Failed to fetch projects');
  }
}
