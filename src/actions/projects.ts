'use server';

import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';
import {
  ProjectIdWithTranslations,
  ProjectTranslation,
  ProjectWithTranslations,
} from '@/types-portfolio/project';
import { ProjectFormValues } from '@/lib/validations';
import { ZodError } from 'zod';

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

export async function fetchProjectIdAction(id: string) {
  const session = await auth();
  try {
    const res = await fetch(`${API_URL}/portfolio/projects/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data: ProjectIdWithTranslations = await res.json();

    return data;
  } catch (error) {
    console.error('Error during fetching data', error);
    return {
      general: {} as ProjectIdWithTranslations['general'],
      translations: [] as ProjectIdWithTranslations['translations'],
    };
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

    revalidateTag('projects-all', 'max');

    return { success: true, message: 'Translation added successfully', data: result };
  } catch (error) {
    console.error('Error trying to add the project', error);
    throw error;
  }
}

export async function updateGeneralInfoAction(
  id: string,
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

    const res = await fetch(`${API_URL}/portfolio/projects/general/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error updating the project general:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();

    revalidateTag('projects-all', 'max');

    return { success: true, message: 'General info updated successfully', data: result };
  } catch (error) {
    console.error('Error trying to update the project general', error);
    throw error;
  }
}

export async function addNewTranslationAction(
  id: string,
  data: Partial<ProjectTranslation>,
  accessToken: string | undefined,
) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  try {
    const res = await fetch(`${API_URL}/portfolio/projects/${id}/locale`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error updating the translation:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();

    revalidateTag('projects-all', 'max');

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

export async function editTranslationAction(
  id: string,
  data: Partial<ProjectTranslation>,
  accessToken: string | undefined,
) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  try {
    const { locale = '', ...values } = data;
    const res = await fetch(`${API_URL}/portfolio/projects/${id}/locale/${locale}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error updating the translation:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();

    revalidateTag('projects-all', 'max');

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

export async function deleteProjectAction(id: string, accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  try {
    const res = await fetch(`${API_URL}/portfolio/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Error deleting project:', errorData);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    revalidateTag('projects-all', 'max');

    return { success: true, message: 'Project deleted successfully', data: null };
  } catch (error) {
    console.error('Error trying to delete the Project', error);
    throw error;
  }
}

export async function deleteTranslationAction(
  id: string,
  locale: string,
  accessToken: string | undefined,
) {
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  try {
    const res = await fetch(`${API_URL}/portfolio/projects/${id}/locale/${locale}`, {
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

    revalidateTag('about-all', 'max');

    return { success: true, message: 'Translation deleted successfully', data: null };
  } catch (error) {
    console.error(`Error trying to delete the ${locale.toUpperCase()} translation`, error);
    throw error;
  }
}
