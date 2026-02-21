'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { ExperienceWithTranslations } from '@/types-portfolio/experience';
import { ExperiencesTable } from './ExperiencesTable';
import { ExperienceMobileCard } from './ExperienceMobileCard';

interface Props {
  experiences: ExperienceWithTranslations[];
}
export function ExperiencesManagement({ experiences }: Props) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <div className="grid grid-cols-1 gap-4">
      {experiences.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">No experiences available</p>
        </div>
      ) : (
        experiences.map((experience) => (
          <ExperienceMobileCard key={experience._id} experience={experience} />
        ))
      )}
    </div>
  ) : (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-xl font-semibold mb-4">Experiences</h2>

      <ExperiencesTable experiences={experiences} />
    </div>
  );
}
