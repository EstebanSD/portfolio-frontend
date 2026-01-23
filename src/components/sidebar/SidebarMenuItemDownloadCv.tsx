'use client';

import { useState, useEffect } from 'react';
import { FileIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { MINUTE } from '@/constants/times';
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui';
import { useTranslation } from '@/lib/i18n/client';

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

// Cache simple in memory
const cvAvailabilityCache = new Map<string, { available: boolean; timestamp: number }>();
const CACHE_DURATION = 5 * MINUTE;

interface SidebarMenuItemDownloadCv {
  lng: string;
  className?: string;
}

export function SidebarMenuItemDownloadCv({ lng, className }: SidebarMenuItemDownloadCv) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { state } = useSidebar();

  const { t } = useTranslation(lng, 'header');

  const checkAvailability = async () => {
    const cacheKey = `cv-${lng}`;
    const cached = cvAvailabilityCache.get(cacheKey);

    // Use cache if is valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setIsAvailable(cached.available);
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch(`${apiUrl}/portfolio/about/resume/download?locale=${lng}`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000), // 5s timeout
      });

      const available = response.ok;
      cvAvailabilityCache.set(cacheKey, { available, timestamp: Date.now() });
      setIsAvailable(available);
    } catch (error) {
      console.error('Error checking CV availability:', error);
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng]);

  const handleDownload = () => {
    if (isAvailable) {
      window.open(`${apiUrl}/portfolio/about/resume/download?locale=${lng}`, '_blank');
    } else {
      checkAvailability(); // Retry
    }
  };

  const getIcon = () => {
    if (isChecking)
      return (
        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      );
    if (isAvailable === false) return <AlertCircleIcon className="w-4 h-4" />;
    return <FileIcon className="w-4 h-4" />;
  };

  const getLabel = () => {
    if (isChecking) return t('resume.loading');
    if (isAvailable === false) return t('resume.error');
    return t('resume.download');
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={handleDownload}
        disabled={isChecking}
        className={cn('cursor-pointer', isAvailable === false && 'opacity-50', className)}
        tooltip={state === 'collapsed' ? getLabel() : undefined}
      >
        {getIcon()}
        <span>{getLabel()}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
