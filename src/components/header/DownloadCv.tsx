'use client';

import { useState, useEffect } from 'react';
import { FileIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';
import { MINUTE } from '@/lib/common';
import { Button } from '../ui';
import { Spinner } from '../common';
import { useTranslation } from '@/lib/i18n/client';

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

// Cache simple in memory
const cvAvailabilityCache = new Map<string, { available: boolean; timestamp: number }>();
const CACHE_DURATION = 5 * MINUTE;

interface DownloadCvProps {
  lng: string;
  className?: string;
}

export function DownloadCv({ lng, className }: DownloadCvProps) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

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

  if (isAvailable === false) {
    return (
      <Button
        className={cn('cursor-pointer opacity-50', className)}
        onClick={handleDownload}
        variant="secondary"
      >
        <AlertCircleIcon />
        {t('resume.error')}
      </Button>
    );
  }

  return (
    <Button
      className={cn('cursor-pointer', className)}
      onClick={handleDownload}
      variant="secondary"
      disabled={isChecking}
    >
      <Spinner
        loading={isChecking}
        text={t('resume.download')}
        loadingText={t('resume.loading')}
        icon={<FileIcon />}
      />
    </Button>
  );
}
