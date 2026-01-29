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
import { SubMenuButtonLanguageSwitcher } from './SubMenuButtonLanguageSwitcher';
import { SidebarSwitchToggleIcon } from './SidebarSwitchToggleIcon';
import { SidebarLanguageSwitcherIcon } from './SidebarLanguageSwitcherIcon';
import { useLocale } from '@/lib/i18n/utils';

export function PublicCollapsibleSettings() {
  const { open, state, isMobile } = useSidebar();
  const lng = useLocale();
  const [localOpen, setLocalOpen] = useState<boolean>(false);

  const { t } = useTranslation(lng, 'header');

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
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={t('selectLanguage')} className="justify-center">
                <SidebarLanguageSwitcherIcon />
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
            {t('settings')}
            <ChevronDownIcon className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
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
                  <SidebarMenuSubItem>
                    <SubMenuButtonLanguageSwitcher />
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
