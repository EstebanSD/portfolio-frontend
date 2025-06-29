'use client';

import { FileIcon } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '@/lib/shadcn/utils';

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

interface DownloadCvProps {
  lng: string;
  label: string;
  className?: string;
}
export function DownloadCv({ lng, label, className }: DownloadCvProps) {
  const handleDownload = () => {
    try {
      window.open(`${apiUrl}/portfolio/about/resume/download?locale=${lng}`, '_blank');
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  };
  return (
    <Button
      className={cn('cursor-pointer', className)}
      onClick={handleDownload}
      variant={'secondary'}
    >
      <FileIcon />
      {label}
    </Button>
  );
}
