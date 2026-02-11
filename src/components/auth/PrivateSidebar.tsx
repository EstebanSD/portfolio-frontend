import Link from 'next/link';
import { HomeIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui';
import { CollapsibleSettings, MenuSections, UserAvatar } from '../sidebar';

export function PrivateSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/admin'}>
                <HomeIcon />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* SECTIONS */}
        <MenuSections />

        {/* SETTINGS */}
        <CollapsibleSettings />
      </SidebarContent>
      <SidebarFooter className="mb-4">
        <UserAvatar />
      </SidebarFooter>
    </Sidebar>
  );
}
