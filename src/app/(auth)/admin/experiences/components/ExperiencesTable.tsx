'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { EyeIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react';
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
import { ConfirmDialog } from '@/components/common';
import { EXPERIENCE_LABELS, ExperienceWithTranslations } from '@/types-portfolio/experience';
import { useDeleteExperienceFlow } from '../hooks/useDeleteExperienceFlow';
import { getExperienceTypeColor } from '../utils';

interface Props {
  experiences: ExperienceWithTranslations[];
}
export function ExperiencesTable({ experiences }: Props) {
  const router = useRouter();

  const { selected, open, setOpen, requestDelete, confirmDelete, isLoading } =
    useDeleteExperienceFlow();

  const handleView = (experience: ExperienceWithTranslations) => {
    router.push(`/admin/experiences/${experience._id}`);
  };

  if (!experiences || experiences.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-500">No experiences available</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Languages</TableHead>
            <TableHead className="hidden lg:table-cell">Technologies</TableHead>
            <TableHead className="hidden md:table-cell">Dates</TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map((experience) => (
            <TableRow key={experience._id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div
                  className="font-semibold truncate max-w-[180px] w-fit cursor-pointer hover:underline"
                  title={experience.companyName}
                  onClick={() => handleView(experience)}
                >
                  {experience.companyName}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="secondary" className={getExperienceTypeColor(experience.type)}>
                  {EXPERIENCE_LABELS[experience.type]}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="truncate max-w-[180px] w-fit">{experience?.location || '-'}</div>
              </TableCell>

              <TableCell className="space-x-1">
                {experience.translations.map(({ locale }) => {
                  return (
                    <Badge key={locale} variant="outline">
                      {locale.toUpperCase()}
                    </Badge>
                  );
                })}
              </TableCell>

              <TableCell className="hidden lg:table-cell">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {experience.technologies?.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {experience.technologies && experience.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{experience.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <div className="text-sm space-y-1">
                  {experience.startDate && (
                    <div>
                      <span className="text-muted-foreground">Start: </span>
                      {format(new Date(experience.startDate), 'dd/MM/yyyy')}
                    </div>
                  )}
                  {experience.endDate && (
                    <div>
                      <span className="text-muted-foreground">End: </span>
                      {format(new Date(experience.endDate), 'dd/MM/yyyy')}
                    </div>
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
                      onClick={() => handleView(experience)}
                      className="cursor-pointer"
                    >
                      <EyeIcon className="h-4 w-4 text-black dark:text-white" />
                      Details
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => requestDelete(experience)}
                      className="cursor-pointer"
                    >
                      <Trash2Icon className="h-4 w-4 text-black dark:text-white" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        title="Delete Experience"
        confirmLabel="Delete"
        loading={isLoading}
        open={open}
        onOpenChange={setOpen}
        onConfirm={confirmDelete}
        description={
          <>
            Are you sure you want to delete <strong>{selected?.companyName}</strong>?
            <br />
            If the experience has translations, they will also be deleted.
            <br />
            <span className="text-destructive">This action cannot be undone.</span>
          </>
        }
      />
    </div>
  );
}
