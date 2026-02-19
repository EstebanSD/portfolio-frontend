'use server';

import { auth } from '@/auth';
import { publicEnv } from '@/config/env.public';
import { type CategoryFormValues } from './validations';

const API_URL = publicEnv.NEXT_PUBLIC_API_URL;

export async function fetchSkillCategoriesAction() {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/skills/categories`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || errorData?.error || `Error HTTP: ${res.status}`;

      throw new Error(message);
    }

    const data = await res.json();

    return {
      success: true,
      message: 'Skills successfully obtained',
      data,
    };
  } catch (error) {
    console.error('Error during fetching data', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    };
  }
}

export async function createCategoryAction(data: CategoryFormValues) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/skills/categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || errorData?.error || `Error HTTP: ${res.status}`;

      throw new Error(message);
    }
  } catch (error) {
    console.error('Error trying to add the Category', error);
    throw error;
  }
}
