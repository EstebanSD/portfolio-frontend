import { ChevronsUpDownIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui';
import { LogoutButtonServer } from '../auth';
import { auth } from '@/auth';
import { getInitials } from '@/utils';

export async function UserAvatar() {
  const session = await auth();

  const userName = session?.user?.name || session?.user?.role;
  const userNameFallback = userName ? getInitials(userName, true) : 'CN';
  const userEmail = session?.user?.email;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size={'lg'}>
              <Avatar>
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback>{userNameFallback}</AvatarFallback>
              </Avatar>
              <span>
                <div className="font-medium truncate">{userName}</div>
                <div className="text-sm truncate">{userEmail}</div>
              </span>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem className="group">
              <LogoutButtonServer />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
