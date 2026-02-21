'use server';

import { auth } from '@/auth';
import { publicEnv } from '@/config/env.public';
import type {
  CategoryFormValues,
  TranslationFormValues,
  UpdateCategoryCleanRequest,
} from './validations';

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

export async function deleteCategoryAction(id: string) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/skills/categories/${id}`, {
      method: 'DELETE',
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
  } catch (error) {
    console.error('Error trying to delete the Category', error);
    throw error;
  }
}

export async function updateCategoryAction(id: string, data: UpdateCategoryCleanRequest) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const { translations, order } = data;
    const promises: Promise<Response>[] = [];

    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    };

    if (order !== undefined) {
      promises.push(
        safeFetch(
          `${API_URL}/portfolio/skills/categories/${id}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ order }),
          },
          'Failed updating order of the category',
        ),
      );
    }

    if (translations.length > 0) {
      for (const { locale, name } of translations) {
        promises.push(
          safeFetch(
            `${API_URL}/portfolio/skills/categories/${id}/locale/${locale}`,
            {
              method: 'PATCH',
              headers,
              body: JSON.stringify({ name }),
            },
            `Failed updating locale ${locale} of the category`,
          ),
        );
      }
    }

    await Promise.all(promises);
  } catch (error) {
    console.error('Error trying to update the Category', error);
    throw error;
  }
}

async function safeFetch(input: RequestInfo, init: RequestInit, fallbackMessage: string) {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message ?? fallbackMessage);
  }

  return res;
}

export async function addTranslationAction(id: string, data: TranslationFormValues) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/skills/categories/${id}/locale`, {
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
    console.error('Error trying to add the Translation', error);
    throw error;
  }
}

////// Items
export async function fetchSkillItemsAction(id: string) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/skills/categories/${id}/items`, {
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
    return data;
  } catch (error) {
    console.error('Error during fetching data', error);
    throw error;
  }
}
