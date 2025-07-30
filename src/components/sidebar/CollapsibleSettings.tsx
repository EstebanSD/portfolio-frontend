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
  useSidebar,
} from '../ui';
import { SwitchToggle } from './SwitchToggle';

export function CollapsibleSettings() {
  const { open } = useSidebar();
  const [localOpen, setLocalOpen] = useState<boolean>(false);

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
            Settings
            <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SwitchToggle />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
