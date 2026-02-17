'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui';

interface CrudDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function CrudDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: CrudDialogProps) {
  const isMobile = useIsMobile();

  const Container = isMobile ? Drawer : Dialog;
  const Trigger = isMobile ? DrawerTrigger : DialogTrigger;
  const Content = isMobile ? DrawerContent : DialogContent;
  const Header = isMobile ? DrawerHeader : DialogHeader;
  const Title = isMobile ? DrawerTitle : DialogTitle;
  const Description = isMobile ? DrawerDescription : DialogDescription;

  return (
    <Container open={open} onOpenChange={onOpenChange}>
      <Trigger asChild>{trigger}</Trigger>

      <Content
        className={!isMobile ? 'sm:max-w-md lg:max-w-lg max-h-[80vh] overflow-y-auto' : undefined}
      >
        <Header>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </Header>

        {children}
      </Content>
    </Container>
  );
}
