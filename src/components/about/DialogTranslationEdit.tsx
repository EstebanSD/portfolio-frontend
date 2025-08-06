'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BriefcaseIcon,
  EditIcon,
  FileIcon,
  FileTextIcon,
  GlobeIcon,
  Loader2Icon,
  MessageSquareDashedIcon,
} from 'lucide-react';
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
} from '../ui';
import { useIsMobile } from '@/hooks';
import { AboutTranslation } from '@/types';
import { FormFileUpload, FormInput, FormTextArea } from '../common';

const translationFormSchema = z.object({
  locale: z.string().nonempty('This field is required.'),
  title: z.string().nonempty('This field is required.'),
  bio: z.string().nonempty('This field is required.'),
  tagline: z.string().optional(),
  cv: z
    .custom<File>((val) => val instanceof File || val === undefined, {
      message: 'Invalid file',
    })
    .optional(),
});
type FormValues = z.infer<typeof translationFormSchema>;

interface Props {
  translation: AboutTranslation;
  handleEdit: (values: FormValues) => Promise<void>;
  localeInfo:
    | {
        code: string;
        name: string;
        flag: string;
      }
    | undefined;
  isLoading?: boolean;
}
export function DialogTranslationEdit({ translation, localeInfo, handleEdit, isLoading }: Props) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: {
      locale: translation.locale,
      title: translation.title,
      bio: translation.bio,
      tagline: translation?.tagline || '',
      cv: undefined,
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
      <form onSubmit={form.handleSubmit(onEdit)} className="space-y-4">
        <FormInput
          disabled
          required
          control={form.control}
          name="locale"
          label={'Language'}
          labelIcon={<GlobeIcon className="w-4 h-4" />}
        />

        <FormInput
          required
          control={form.control}
          name="title"
          label={'Title'}
          labelIcon={<BriefcaseIcon className="w-4 h-4" />}
          placeholder="Full Stack"
        />

        <FormInput
          control={form.control}
          name="tagline"
          label={'Tagline (Optional)'}
          labelIcon={<MessageSquareDashedIcon className="w-4 h-4" />}
          placeholder="A catchy tagline"
        />

        <FormTextArea
          required
          control={form.control}
          name={'bio'}
          label={'Biography'}
          labelIcon={<FileTextIcon className="w-4 h-4" />}
          placeholder="Write your biography"
          rows={4}
          maxLength={500}
        />

        <FormFileUpload
          control={form.control}
          name="cv"
          label={'Curriculum Vitae'}
          labelIcon={<FileIcon className="h-4 w-4" />}
          accept=".pdf,.doc,.docx"
          maxSize={5}
          showPreview={true}
          allowDownload={true}
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
        {isLoading ? (
          <>
            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Translation'
        )}
      </Button>
    </>
  );
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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
        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <EditIcon className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
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
