/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';

type RenderWithFormOptions = {
  defaultValues?: Record<string, any>;
};

export function renderWithForm(
  ui: React.ReactElement,
  { defaultValues }: RenderWithFormOptions = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm({ defaultValues });

    return (
      <FormProvider {...methods}>
        <form>{children}</form>
      </FormProvider>
    );
  }

  return render(ui, { wrapper: Wrapper });
}

export function renderWrapper(
  ui: React.ReactElement,
  { defaultValues }: RenderWithFormOptions = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm({ defaultValues });

    return <FormProvider {...methods}>{children}</FormProvider>;
  }

  return render(ui, { wrapper: Wrapper });
}
