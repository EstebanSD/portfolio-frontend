'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '../ui';
import { useTranslation } from '@/lib/i18n/client';
import { SubMenuButtonSwitchToggle } from './SubMenuButtonSwitchToggle';
import { SidebarSwitchToggleIcon } from './SidebarSwitchToggleIcon';

export function CollapsibleSettings() {
  const { open, state, isMobile } = useSidebar();
  const [localOpen, setLocalOpen] = useState<boolean>(false);

  const { t } = useTranslation('en', 'header');

  const isCollapsed = state === 'collapsed';

  useEffect(() => {
    if (!open || isCollapsed) {
      setLocalOpen(false);
    }
  }, [open, isCollapsed]);

  const handleToggle = () => {
    if (open && !isCollapsed) {
      setLocalOpen((prevOpen) => !prevOpen);
    }
  };

  if (isCollapsed && !isMobile) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={t('selectMode')} className="justify-center">
                <SidebarSwitchToggleIcon />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <Collapsible open={localOpen && open} onOpenChange={handleToggle} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="group-data-[state=open]/collapsible:bg-sidebar-accent group-data-[state=open]/collapsible:text-sidebar-accent-foreground">
            Settings
            <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SubMenuButtonSwitchToggle />
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
