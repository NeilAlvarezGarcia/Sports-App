import { DetailedHTMLProps, FormEvent, FormHTMLAttributes } from 'react';

export interface FormProps<FormValues>
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'ref'> {
  onSubmit?: (values: FormValues, e?: FormEvent<HTMLFormElement>) => Promise<void> | void;
  initialvalues?: FormValues | null;
  // schema?: Record<string, >;
}

export interface FormContextType<FormValues> {
  loading: boolean;
  errors: Record<FormValues, string> | null;
  values: FormValues | null | undefined;
  handleFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
