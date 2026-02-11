'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BrainCircuitIcon,
  BriefcaseIcon,
  ContactIcon,
  FolderCodeIcon,
  MailIcon,
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui';

const items = [
  {
    title: 'About',
    url: '/admin/about',
    icon: ContactIcon,
  },
  {
    title: 'Projects',
    url: '/admin/projects',
    icon: FolderCodeIcon,
  },
  {
    title: 'Skills',
    url: '/admin/skills',
    icon: BrainCircuitIcon,
  },
  {
    title: 'Experiences',
    url: '/admin/experiences',
    icon: BriefcaseIcon,
  },
  {
    title: 'Contact',
    url: '/admin/contact',
    icon: MailIcon,
  },
];
export function MenuSections() {
  const path = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Sections</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={path === item.url}>
                <Link href={item.url} aria-label={'Navigate to ' + item.title}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
