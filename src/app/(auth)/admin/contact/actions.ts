'use server';

import { auth } from '@/auth';
import { publicEnv } from '@/config/env.public';
import { ContactFormValues } from './validations';

const API_URL = publicEnv.NEXT_PUBLIC_API_URL;

export async function fetchContactAction() {
  const session = await auth();
  try {
    const res = await fetch(`${API_URL}/portfolio/contact`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();

    const socialLinks = normalizeNullToEmptyString(data?.socialLinks);
    const filteredData = {
      email: data?.email,
      phone: data?.phone,
      socialLinks: socialLinks,
    };

    return {
      success: true,
      message: 'Contact information successfully obtained',
      data: filteredData as ContactFormValues,
    };
  } catch (error) {
    console.error('Error during fetching contact data', error);
    return {
      success: false,
      message: 'Error in obtain Contact information',
      data: null,
    };
  }
}

function normalizeNullToEmptyString<T extends Record<string, string | null>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value ?? ''])) as {
    [K in keyof T]: string;
  };
}

export async function updateContactAction(values: ContactFormValues) {
  const session = await auth();
  if (!session?.accessToken) {
    throw new Error('Authentication required');
  }

  try {
    const res = await fetch(`${API_URL}/portfolio/contact`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error updating contact information:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();

    return {
      success: true,
      message: 'Contact information updated correctly',
      data: result,
    };
  } catch (error) {
    throw error;
  }
}
