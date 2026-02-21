'use server';

import { auth } from '@/auth';
import { publicEnv } from '@/config/env.public';
import type {
  ExperienceIdWithTranslations,
  ExperienceWithTranslations,
} from '@/types-portfolio/experience';
import type { GeneralExperienceFormValues } from './validations';

const API_URL = publicEnv.NEXT_PUBLIC_API_URL;

type FetchExperiencesResult = {
  success: boolean;
  message: string;
  data: ExperienceWithTranslations[];
};

type FetchExperienceResult = {
  success: boolean;
  message: string;
  data: ExperienceIdWithTranslations | null;
};

export async function fetchExperiencesAction(): Promise<FetchExperiencesResult> {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/experiences/all`, {
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
      message: 'Experiences successfully obtained',
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

export async function createExperienceAction(data: GeneralExperienceFormValues) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const formData = new FormData();
    formData.append('companyName', data.companyName);
    formData.append('type', data.type);
    if (data.location) {
      formData.append('location', data.location);
    }
    formData.append('ongoing', String(data.ongoing));
    if (data.startDate) {
      formData.append('startDate', data.startDate);
    }
    if (data.endDate) {
      formData.append('endDate', data.endDate);
    }
    if (data.technologies && data.technologies.length > 0) {
      formData.append('technologies', JSON.stringify(data.technologies));
    }
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    const res = await fetch(`${API_URL}/portfolio/experiences`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || errorData?.error || `Error HTTP: ${res.status}`;

      throw new Error(message);
    }
  } catch (error) {
    console.error('Error trying to add the Experience', error);
    throw error;
  }
}

export async function deleteExperienceAction(id: string) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/experiences/${id}`, {
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
    console.error('Error trying to delete the Experience', error);
    throw error;
  }
}

export async function fetchExperienceIdAction(id: string): Promise<FetchExperienceResult> {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${API_URL}/portfolio/experiences/${id}`, {
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
      message: 'Experience successfully obtained',
      data,
    };
  } catch (error) {
    console.error('Error during fetching data', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      data: null,
    };
  }
}

export async function updateGeneralInfoAction(id: string, data: GeneralExperienceFormValues) {
  const session = await auth();
  try {
    if (!session?.accessToken) {
      throw new Error('Unauthorized');
    }

    const formData = new FormData();
    formData.append('companyName', data.companyName);
    formData.append('type', data.type);
    if (data.location) {
      formData.append('location', data.location);
    }
    formData.append('ongoing', String(data.ongoing));
    if (data.startDate) {
      formData.append('startDate', data.startDate);
    }
    if (data.endDate) {
      formData.append('endDate', data.endDate);
    }
    if (data.technologies && data.technologies.length > 0) {
      formData.append('technologies', JSON.stringify(data.technologies));
    }
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    const res = await fetch(`${API_URL}/portfolio/experiences/general/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || errorData?.error || `Error HTTP: ${res.status}`;

      throw new Error(message);
    }
  } catch (error) {
    console.error('Error trying to update the experience general', error);
    throw error;
  }
}
