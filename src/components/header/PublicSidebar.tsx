'use client';

import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  BrainCircuitIcon,
  BriefcaseIcon,
  ContactIcon,
  FolderCodeIcon,
  HomeIcon,
  LucideProps,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui';
import { PublicCollapsibleSettings, SidebarMenuItemDownloadCv } from '../sidebar';
import { useTranslation } from '@/lib/i18n/client';
import { useLocale } from '@/lib/i18n/utils';

export function PublicSidebar() {
  const lng = useLocale();
  const { t } = useTranslation(lng, 'header');
  const sections: {
    key: string;
    label: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  }[] = [
    { key: 'about', label: t('sections.about'), url: `/${lng}#about`, icon: ContactIcon },
    {
      key: 'projects',
      label: t('sections.projects'),
      url: `/${lng}#projects`,
      icon: FolderCodeIcon,
    },
    { key: 'skills', label: t('sections.skills'), url: `/${lng}#skills`, icon: BrainCircuitIcon },
    {
      key: 'experiences',
      label: t('sections.experiences'),
      url: `/${lng}#experiences`,
      icon: BriefcaseIcon,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/en'}>
                <HomeIcon />
                <span>{t('home')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* SECTIONS */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SETTINGS */}
        <PublicCollapsibleSettings />
      </SidebarContent>

      <SidebarFooter className="mb-4">
        <SidebarMenu>
          <SidebarMenuItemDownloadCv lng={lng} />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
