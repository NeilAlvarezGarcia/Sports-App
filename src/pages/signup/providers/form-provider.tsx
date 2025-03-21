import { PropsWithChildren, ReactNode, useCallback, useMemo } from 'react';
import { FormProvider as FormProviderBase } from '../../../components/form';
import { FormProviderValues } from '../types/form-provider-types';
import { signUp } from '../../../firebase/authentication';

export function FormProvider({ children }: PropsWithChildren<ReactNode>) {
  const handleSubmit = useCallback(async (values: FormProviderValues) => {
    await signUp(values);
  }, []);

  const initialvalues = useMemo(
    () => ({
      email: '',
      password: '',
      confirmPassword: '',
    }),
    []
  );

  return (
    <FormProviderBase initialvalues={initialvalues} onSubmit={handleSubmit}>
      {children}
    </FormProviderBase>
  );
}
