'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { CalendarIcon, EditIcon, ExternalLinkIcon, ImageIcon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { getStatusColor, getTypeColor } from '@/utils';
import { ProjectWithTranslations } from '@/types-portfolio/project';
import { DialogDelete } from '@/components/common';
import { deleteProjectAction } from '@/actions/projects';

const PROJECT_TYPES = {
  personal: 'Personal',
  company: 'Company',
  freelance: 'Freelance',
};

const PROJECT_STATUSES = {
  in_progress: 'In Progress',
  completed: 'Completed',
  paused: 'Paused',
};

interface Props {
  session: Session | null;
  project: ProjectWithTranslations;
}

export function PrivProjectCard({ session, project }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!session?.accessToken) {
      toast.error('Authentication required');
      return;
    }

    startTransition(async () => {
      try {
        await deleteProjectAction(project._id, session.accessToken);
        toast.success(`Project ${project.title} deleted successfully`);
      } catch (error) {
        toast.error(`Failed to delete project ${project.title}`);
        console.error('Delete error:', error);
      }
    });
  };

  const handleEdit = (project: ProjectWithTranslations) => {
    router.push(`/en/admin/projects/${project._id}`);
  };

  return (
    <div className="bg-background dark:bg-gray-900 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      {/* Project Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(project.type)}`}
              >
                {PROJECT_TYPES[project.type]}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                  project.status,
                )}`}
              >
                {PROJECT_STATUSES[project.status]}
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => handleEdit(project)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <EditIcon className="w-4 h-4 text-black dark:text-white" />
            </button>

            <DialogDelete title="Delete Project" handleDelete={handleDelete} isLoading={isPending}>
              <>
                Are you sure you want to delete <strong>{project.title}</strong>?
                <br />
                If the project has translations, they will also be deleted.
                <br />
                <span className="text-destructive">This action cannot be undone.</span>
              </>
            </DialogDelete>
          </div>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">TECHNOLOGIES</p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Dates */}
        {(project.startDate || project.endDate) && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">DATES</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {project.startDate && new Date(project.startDate).toLocaleDateString('en-EN')}
                {project.startDate && project.endDate && ' - '}
                {project.endDate && new Date(project.endDate).toLocaleDateString('en-EN')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Project Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Links */}
          <div className="flex items-center gap-2">
            {project.links?.github && (
              <button
                onClick={() => window.open(project.links.github, '_blank')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SiGithub className="h-4 w-4" />
              </button>
            )}
            {project.links?.website && (
              <button
                onClick={() => window.open(project.links.website, '_blank')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ExternalLinkIcon className="w-4 h-4" />
              </button>
            )}
            {project.images && project.images.length > 0 && (
              <div className="flex items-center gap-1 ml-2">
                <ImageIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">{project.images.length}</span>
              </div>
            )}
          </div>

          {/* Languages */}
          <div className="flex items-center gap-1">
            {project.translations.map(({ locale }, index) => (
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
