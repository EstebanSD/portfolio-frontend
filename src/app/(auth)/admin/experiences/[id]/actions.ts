'use server';

import { auth } from '@/auth';
import { publicEnv } from '@/config/env.public';
import type { Language } from '@/lib/i18n';
import type { TranslationFormValues } from './validations';

const API_URL = publicEnv.NEXT_PUBLIC_API_URL;

export async function addNewTranslationAction(id: string, data: TranslationFormValues) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/experiences/${id}/locale`, {
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
    console.error('Error trying to add the translation', error);
    throw error;
  }
}

export async function deleteTranslationAction(id: string, locale: Language) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/experiences/${id}/locale/${locale}`, {
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
    console.error('Error trying to delete translation', error);
    throw error;
  }
}

export async function updateTranslationAction(id: string, data: TranslationFormValues) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const { locale, ...values } = data;
    const res = await fetch(`${API_URL}/portfolio/experiences/${id}/locale/${locale}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || errorData?.error || `Error HTTP: ${res.status}`;

      throw new Error(message);
    }
  } catch (error) {
    console.error('Error trying to edit the translation', error);
    throw error;
  }
}
