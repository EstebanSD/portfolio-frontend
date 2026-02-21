'use client';

import { useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
} from '@/components/ui';
import { ConfirmDialog, FormInput, Spinner } from '@/components/common';
import type { Language } from '@/lib/i18n';
import type { CategoriesWithTranslations } from '@/types-portfolio/skill';
import { getAvailableLocales, getLocaleInfo } from '@/utils';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import {
  updateCategoryFormSchema,
  type UpdateCategoryFormValues,
  type UpdateCategoryCleanRequest,
} from '../validations';
import { formatKey } from '../utils/formatKey';
import { ButtonAddTranslation } from './ButtonAddTranslation';

interface CategoryConfigCardProps {
  category: CategoriesWithTranslations;
}
export function CategoryConfigCard({ category }: CategoryConfigCardProps) {
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { deleteCategory, isEliminating } = useDeleteCategory();
  const { updateCategory, isSubmitting } = useUpdateCategory();

  const locales = getAvailableLocales(category.translations);

  const form = useForm<UpdateCategoryFormValues>({
    resolver: zodResolver(updateCategoryFormSchema),
    defaultValues: {
      key: category.key,
      order: category.order,
      translations: category.translations ?? [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'translations',
  });

  const handleSubmit = async (values: UpdateCategoryFormValues) => {
    const payload = buildCategoryUpdatePayload(category, values);

    if (!payload) return;

    await updateCategory(category._id, payload);
  };

  useEffect(() => {
    form.reset({
      key: category.key,
      order: category.order,
      translations: category.translations ?? [],
    });
  }, [category, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="h-8 flex items-center">
                <p className="text-sm">General</p>
              </div>

              <FormInput disabled name="key" label="Key" />

              <FormInput name="order" label="Order" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-8 flex items-center justify-between">
                <p className="text-sm">Translations</p>

                {locales.length > 0 && (
                  <ButtonAddTranslation categoryId={category._id} locales={locales} />
                )}
              </div>

              {fields.map((field, index) => {
                const locale = field.locale as Language;
                const localeInfo = getLocaleInfo(locale);
                return (
                  <div key={field.id} className="flex items-end gap-4">
                    <div className="h-9 flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded">
                      <span>{localeInfo?.flag}</span>
                      <span>{localeInfo?.code.toLocaleUpperCase()}</span>
                    </div>

                    <FormInput name={`translations.${index}.name`} label="Name" />
                  </div>
                );
              })}
            </div>

            <button ref={submitRef} type="submit" className="hidden" />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button
          variant="success"
          disabled={isSubmitting || !form.formState.isDirty}
          onClick={() => submitRef.current?.click()}
          className="min-w-30 cursor-pointer"
        >
          <Spinner loading={isSubmitting} text="Save" loadingText="Saving..." />
        </Button>

        <ConfirmDialog
          title="Delete Category"
          confirmLabel="Delete"
          loading={isEliminating}
          onConfirm={() => deleteCategory(category._id)}
          trigger={
            <Button variant={'outline'} className="border-destructive cursor-pointer">
              <Trash2Icon className="w-4 h-4 text-destructive" />
            </Button>
          }
          description={
            <>
              Are you sure you want to delete {formatKey(category.key)}?
              <br />
              If the category has translations, they will also be deleted.
              <br />
              But if it has elements (skills), an error will occur.
              <br />
              <span className="text-destructive">This action cannot be undone.</span>
            </>
          }
        />
      </CardFooter>
    </Card>
  );
}

function buildCategoryUpdatePayload(
  original: CategoriesWithTranslations,
  current: UpdateCategoryFormValues,
): UpdateCategoryCleanRequest | null {
  const hasOrderChanged = Number(original.order) !== Number(current.order);
  const originalMapTranslations = new Map(original.translations.map((t) => [t.locale, t.name]));
  const changedTranslations = current.translations.filter(
    (t) => originalMapTranslations.get(t.locale) !== t.name,
  );

  if (!hasOrderChanged && changedTranslations.length === 0) {
    return null;
  }

  return {
    order: hasOrderChanged ? current.order : undefined,
    translations: changedTranslations,
  };
}
