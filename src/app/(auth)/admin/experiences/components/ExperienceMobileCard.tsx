'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CalendarIcon, EditIcon, Trash2Icon } from 'lucide-react';
import { ConfirmDialog } from '@/components/common';
import { EXPERIENCE_LABELS, ExperienceWithTranslations } from '@/types-portfolio/experience';
import { useDeleteExperience } from '../hooks/useDeleteExperience';
import { getExperienceTypeColor } from '../utils';

interface Props {
  experience: ExperienceWithTranslations;
}

// MOBILE
export function ExperienceMobileCard({ experience }: Props) {
  const router = useRouter();
  const { deleteExperience, isLoading } = useDeleteExperience();

  const handleEdit = (experience: ExperienceWithTranslations) => {
    router.push(`/admin/experiences/${experience._id}`);
  };

  return (
    <div className="bg-background dark:bg-gray-900 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      {/* Project Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{experience.companyName}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getExperienceTypeColor(experience.type)}`}
              >
                {EXPERIENCE_LABELS[experience.type]}
              </span>

              {experience.location && (
                <span className="text-xs text-muted-foreground">{experience.location}</span>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => handleEdit(experience)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <EditIcon className="w-4 h-4 text-black dark:text-white" />
            </button>

            <ConfirmDialog
              title="Delete Experience"
              confirmLabel="Delete"
              loading={isLoading}
              onConfirm={() => deleteExperience(experience._id)}
              trigger={
                <button className="p-2 hover:text-red-600">
                  <Trash2Icon className="w-4 h-4" />
                </button>
              }
              description={
                <>
                  Are you sure you want to delete <strong>{experience.companyName}</strong>?
                  <br />
                  If the project has translations, they will also be deleted.
                  <br />
                  <span className="text-destructive">This action cannot be undone.</span>
                </>
              }
            />
          </div>
        </div>

        <div className="flex items-start mb-4 gap-8">
          {/* Logo */}
          {experience.companyLogo && (
            <div className="w-20">
              <p className="text-xs font-medium text-muted-foreground mb-2">LOGO</p>
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={experience.companyLogo.url}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw"
                  alt="company-logo"
                />
              </div>
            </div>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground mb-2">TECHNOLOGIES</p>
              <div className="flex flex-wrap gap-1">
                {experience.technologies.slice(0, 4).map((tech, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                    {tech}
                  </span>
                ))}
                {experience.technologies.length > 4 && (
                  <span className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded">
                    +{experience.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Dates */}
          {(experience.startDate || experience.endDate) && (
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {experience.startDate &&
                    new Date(experience.startDate).toLocaleDateString('en-US')}
                  {experience.startDate && experience.endDate && ' - '}
                  {experience.endDate && new Date(experience.endDate).toLocaleDateString('en-US')}
                </span>
              </div>
            </div>
          )}

          {/* Languages */}
          <div className="flex items-center gap-1">
            {experience.translations.map(({ locale }, index) => (
              <span
                key={index}
                className="w-6 h-6 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center justify-center"
              >
                {locale.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
