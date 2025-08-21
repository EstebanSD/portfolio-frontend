'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { EditIcon, ExternalLinkIcon, EyeIcon, MoreHorizontalIcon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { ProjectWithTranslations } from '@/types';
import { getStatusColor, getTypeColor } from '@/utils';
import { deleteProjectAction } from '@/actions/projects';
import { DialogDelete } from '@/components/common';

interface Props {
  session: Session | null;
  projects: ProjectWithTranslations[];
}
export function ProjectsTable({ session, projects }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (project: ProjectWithTranslations) => {
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
    console.log('Edit project:', project);
    router.push(`/en/admin/projects/${project._id}/edit`); // or the same page like view
  };

  const handleView = (project: ProjectWithTranslations) => {
    console.log('Project:', project);
    router.push(`/en/admin/projects/${project._id}`);
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-500">No projects available</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Languages</TableHead>
            <TableHead className="hidden lg:table-cell">Technologies</TableHead>
            <TableHead className="hidden md:table-cell">Dates</TableHead>
            <TableHead>Links</TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="font-semibold truncate max-w-[180px]" title={project.title}>
                  {project.title}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="secondary" className={getTypeColor(project.type)}>
                  {project.type}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge variant="secondary" className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </TableCell>

              <TableCell className="space-x-1">
                {project.translations.map(({ locale }) => {
                  return (
                    <Badge key={locale} variant="outline">
                      {locale.toUpperCase()}
                    </Badge>
                  );
                })}
              </TableCell>

              <TableCell className="hidden lg:table-cell">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {project.technologies?.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <div className="text-sm space-y-1">
                  {project.startDate && (
                    <div>
                      <span className="text-muted-foreground">Start: </span>
                      {format(new Date(project.startDate), 'dd/MM/yyyy')}
                    </div>
                  )}
                  {project.endDate && (
                    <div>
                      <span className="text-muted-foreground">End: </span>
                      {format(new Date(project.endDate), 'dd/MM/yyyy')}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  {project.links?.github && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(project.links?.github, '_blank')}
                    >
                      <SiGithub className="h-4 w-4" />
                    </Button>
                  )}
                  {project.links?.website && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(project.links.website, '_blank')}
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleView(project)}
                      className="cursor-pointer"
                      disabled={true} // TODO: Implement view functionality
                    >
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEdit(project)}
                      className="cursor-pointer"
                      disabled={true} // TODO: Implement edit functionality
                    >
                      <EditIcon className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <DialogDelete
                        label={'Delete'}
                        title="Delete Project"
                        handleDelete={() => handleDelete(project)}
                        isLoading={isPending}
                      >
                        <>
                          Are you sure you want to delete <strong>{project.title}</strong>?
                          <br />
                          If the project has translations, they will also be deleted.
                          <br />
                          <span className="text-destructive">This action cannot be undone.</span>
                        </>
                      </DialogDelete>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
