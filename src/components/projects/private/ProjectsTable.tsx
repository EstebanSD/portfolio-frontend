'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { EditIcon, ExternalLinkIcon, EyeIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react';
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

interface Props {
  projects: ProjectWithTranslations[];
}
export function ProjectsTable({ projects }: Props) {
  const router = useRouter();
  const onEdit = (project: ProjectWithTranslations) => {
    console.log('Edit project:', project);
    router.push(`/en/admin/projects/${project._id}/edit`); // or the same page like view
  };

  const onDelete = (project: ProjectWithTranslations) => {
    console.log('Delete project:', project);
    // Modal
  };

  const onView = (project: ProjectWithTranslations) => {
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
            <TableHead>Language</TableHead>
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
                    <DropdownMenuItem onClick={() => onView(project)} className="cursor-pointer">
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(project)} className="cursor-pointer">
                      <EditIcon className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(project)}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2Icon className="mr-2 h-4 w-4" />
                      Delete
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
