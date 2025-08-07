'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '../ui';
import { SwitchToggle } from './SwitchToggle';
import { useTranslation } from '@/lib/i18n/client';
import { SubLanguageSwitcher } from './SubLanguageSwitcher';

export function PublicCollapsibleSettings() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const [localOpen, setLocalOpen] = useState<boolean>(false);

  const lng = pathname.split('/')[1] || 'en';
  const { t } = useTranslation(lng, 'header');

  useEffect(() => {
    if (!open) setLocalOpen(false);
  }, [open]);

  const handleToggle = () => {
    if (open) {
      setLocalOpen((prevOpen) => !prevOpen);
    }
  };
  return (
    <Collapsible open={localOpen && open} onOpenChange={handleToggle} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            {t('settings')}
            <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <SwitchToggle />
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SubLanguageSwitcher />
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
