'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BriefcaseIcon, EditIcon, FileTextIcon, GlobeIcon } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Form,
  SheetClose,
} from '@/components/ui';
import { useIsMobile } from '@/hooks';
import { ProjectTranslation } from '@/types';
import { FormInput, FormTextArea, Spinner } from '@/components/common';

const translationFormSchema = z.object({
  locale: z.string().nonempty('This field is required.'),
  summary: z.string().nonempty('This field is required.'),
  description: z.string().nonempty('This field is required.'),
});
type FormValues = z.infer<typeof translationFormSchema>;

interface Props {
  translation: ProjectTranslation;
  handleEdit: (values: FormValues) => Promise<void>;
  localeInfo:
    | {
        code: string;
        name: string;
        flag: string;
      }
    | undefined;
  isLoading: boolean;
}
export function DialogProjectTranslationEdit({
  translation,
  localeInfo,
  handleEdit,
  isLoading,
}: Props) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: {
      locale: translation.locale,
      summary: translation.summary,
      description: translation.description,
    },
  });

  const onEdit = async (values: FormValues) => {
    await handleEdit(values);
    setOpen(false);
  };

  const TITLE = 'Edit Translation';
  const DESC = localeInfo?.name
    ? `Update the translation for ${localeInfo?.name}`
    : 'Update the translation';

  const FormContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onEdit)} className="space-y-4 p-2">
        <FormInput
          disabled
          required
          name="locale"
          label={'Language'}
          labelIcon={<GlobeIcon className="w-4 h-4" />}
        />

        <FormInput
          required
          name="summary"
          label={'Summary'}
          labelIcon={<BriefcaseIcon className="w-4 h-4" />}
          placeholder="Write a short description"
        />

        <FormTextArea
          required
          control={form.control}
          name="description"
          label={'Description'}
          labelIcon={<FileTextIcon className="w-4 h-4" />}
          placeholder="Write a full description"
          rows={4}
          maxLength={500}
        />
      </form>
    </Form>
  );

  const FooterButtons = () => (
    <>
      {isMobile ? (
        <SheetClose asChild>
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
        </SheetClose>
      ) : (
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      )}

      <Button
        type="submit"
        variant={'success'}
        onClick={form.handleSubmit(onEdit)}
        disabled={isLoading}
        className="flex-1 md:flex-initial"
      >
        <Spinner loading={isLoading} text={'Update Translation'} loadingText={'Updating...'} />
      </Button>
    </>
  );
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="p-2 text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <EditIcon className="w-4 h-4" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{TITLE}</DrawerTitle>
            <DrawerDescription>{DESC}</DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto py-4">
            <FormContent />
          </div>

          <DrawerFooter className="flex-row gap-2">
            <FooterButtons />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <EditIcon className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md lg:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{TITLE}</DialogTitle>
          <DialogDescription>{DESC}</DialogDescription>
        </DialogHeader>

        <FormContent />

        <DialogFooter>
          <FooterButtons />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
