import { serverTranslation } from '@/lib/i18n';

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export async function PublicProjects({ lng }: { lng: string }) {
  const { t } = await serverTranslation(lng, 'projects');

  try {
    const response = await fetch(`${apiUrl}/portfolio/projects?locale=${lng}`, {
      cache: 'force-cache',
      next: {
        revalidate: 3600,
        tags: ['projects'],
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const projects = await response.json();

    return (
      <section className="pt-2">
        {projects.map((project: { _id: string; description: string }) => (
          <div key={project._id}>{project.description}</div>
        ))}
      </section>
    );
  } catch (error) {
    console.error('Error loading projects:', error);

    return (
      <section className="pt-2">
        <h2>{t('error.title')}</h2>
        <p>{t('error.retry')}</p>
      </section>
    );
  }
}
