'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

export function SidebarSwitchToggleIcon() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SunIcon className="h-4 w-4 opacity-50" />;
  }

  const isDark = theme === 'dark';

  return (
    <div className="relative">
      {isDark ? (
        <MoonIcon className="h-4 w-4 text-blue-400" />
      ) : (
        <SunIcon className="h-4 w-4 text-yellow-500" />
      )}
    </div>
  );
}
