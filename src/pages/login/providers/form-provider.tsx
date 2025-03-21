import { PropsWithChildren, ReactNode } from 'react';
import { FormProvider as FormProviderBase } from '../../../components/form';

export function FormProvider({ children }: PropsWithChildren<ReactNode>) {
  return <FormProviderBase>{children}</FormProviderBase>;
}
