'use server';

import { ZodError } from 'zod';
import { auth } from '@/auth';
import { publicEnv } from '@/config/env.public';
import { AboutAll } from '@/types-portfolio/about';
import { aboutGeneralFormServerSchema, aboutTranslationFormServerSchema } from './validations';

const API_URL = publicEnv.NEXT_PUBLIC_API_URL;

export async function fetchAboutAction() {
  const session = await auth();
  try {
    const res = await fetch(`${API_URL}/portfolio/about`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data: AboutAll = await res.json();

    const parsedData = {
      ...data,
      general: {
        ...data.general,
        birthYear: data.general.birthYear ? data.general.birthYear.toString() : '',
      },
    };

    return parsedData;
  } catch (error) {
    console.error('Error during fetching data', error);
    return { general: {}, translations: [] };
  }
}

export async function updateGeneralInfoAction(formData: FormData, accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error('Authentication required');
  }

  try {
    const rawData = {
      fullName: formData.get('fullName') as string,
      birthYear: formData.get('birthYear') as string,
      location: formData.get('location') as string,
      positioningTags: JSON.parse((formData.get('positioningTags') as string) || '[]'),
      image: formData.get('image') as File | null,
    };

    const cleanData = Object.fromEntries(
      Object.entries(rawData).filter(([, value]) => {
        if (value === null || value === undefined) return false;
        return true;
      }),
    );

    const validatedData = aboutGeneralFormServerSchema.parse(cleanData);

    const apiFormData = new FormData();
    for (const [key, value] of Object.entries(validatedData)) {
      if (value === undefined) continue;

      if (value instanceof File) {
        apiFormData.append(key, value);
      } else {
        apiFormData.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
      }
    }

    const isUpdate = formData.get('_isUpdate') === 'true';
    const method = isUpdate ? 'PATCH' : 'POST';

    const res = await fetch(`${API_URL}/portfolio/about/general`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: apiFormData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error updating general information:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();

    return {
      success: true,
      message: 'General information updated successfully',
      data: result,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
      throw new Error(`Validation errors: ${errorMessages.join(', ')}`);
    }

    console.error('Error updating general information:', error);
    throw error;
  }
}

export async function addNewTranslationAction(formData: FormData, accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  try {
    const rawData = {
      locale: formData.get('locale') as string,
      title: formData.get('title') as string,
      bio: formData.get('bio') as string,
      tagline: (formData.get('tagline') as string) || '',
      cv: formData.get('cv') as File | null,
    };

    const cleanData = Object.fromEntries(
      Object.entries(rawData).filter(([, value]) => {
        if (value === null || value === undefined) return false;
        return true;
      }),
    );

    const validatedData = aboutTranslationFormServerSchema.parse(cleanData);

    const apiFormData = new FormData();
    for (const [key, value] of Object.entries(validatedData)) {
      if (value === undefined) continue;

      if (value instanceof File) {
        apiFormData.append(key, value);
      } else {
        apiFormData.append(key, String(value));
      }
    }

    const res = await fetch(`${API_URL}/portfolio/about/locale`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: apiFormData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error updating the translation:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();

    return { success: true, message: 'Translation added successfully', data: result };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
      throw new Error(`Validation errors: ${errorMessages.join(', ')}`);
    }

    console.error('Error trying to add the translation', error);
    throw error;
  }
}

export async function editTranslationAction(formData: FormData, accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  try {
    const rawData = {
      locale: formData.get('locale') as string,
      title: formData.get('title') as string,
      bio: formData.get('bio') as string,
      tagline: (formData.get('tagline') as string) || '',
      cv: formData.get('cv') as File | null,
    };

    const cleanData = Object.fromEntries(
      Object.entries(rawData).filter(([, value]) => {
        if (value === null || value === undefined) return false;
        return true;
      }),
    );

    const validatedData = aboutTranslationFormServerSchema.parse(cleanData);

    const apiFormData = new FormData();
    for (const [key, value] of Object.entries(validatedData)) {
      if (value === undefined) continue;

      if (value instanceof File) {
        apiFormData.append(key, value);
      } else {
        apiFormData.append(key, String(value));
      }
    }

    const res = await fetch(`${API_URL}/portfolio/about/locale`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: apiFormData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error updating the translation:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();

    return { success: true, message: 'Translation edited successfully', data: result };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
      throw new Error(`Validation errors: ${errorMessages.join(', ')}`);
    }

    console.error('Error trying to edit the translation', error);
    throw error;
  }
}

export async function deleteTranslationAction(locale: string, accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  try {
    const res = await fetch(`${API_URL}/portfolio/about/locale/${locale}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error deleting translation:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    return { success: true, message: 'Translation deleted successfully', data: null };
  } catch (error) {
    console.error(`Error trying to delete the ${locale.toUpperCase()} translation`, error);
    throw error;
  }
}
