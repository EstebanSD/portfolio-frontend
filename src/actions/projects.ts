'use server';

import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';
import { ProjectWithTranslations } from '@/types';
import { ProjectFormValues } from '@/lib/validations';

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

export async function addNewProjectAction(
  data: ProjectFormValues,
  accessToken: string | undefined,
) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('status', data.status);
    if (data.startDate) {
      formData.append('startDate', data.startDate);
    }
    if (data.endDate) {
      formData.append('endDate', data.endDate);
    }
    if (data.technologies && data.technologies.length > 0) {
      formData.append('technologies', JSON.stringify(data.technologies));
    }
    if (data.links) {
      if (data.links.github) {
        formData.append('links[github]', data.links.github);
      }
      if (data.links.website) {
        formData.append('links[website]', data.links.website);
      }
    }
    if (data.files && data.files.length > 0) {
      data.files.forEach((file: string | Blob) => {
        formData.append('files', file);
      });
    }

    const res = await fetch(`${API_URL}/portfolio/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error adding the project:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();

    revalidateTag('projects');
    revalidateTag('projects-all');

    return { success: true, message: 'Translation added successfully', data: result };
  } catch (error) {
    console.error('Error trying to add the project', error);
    throw error;
  }
}
