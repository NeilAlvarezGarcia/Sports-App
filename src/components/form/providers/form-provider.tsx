import {
  ChangeEvent,
  createContext,
  FormEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { FormContextType, FormProps } from '../types/form-types';

export const FormContext = createContext<FormContextType<any> | null>(null);

function FormProviderForwardingRef<FormValues>(
  { onSubmit, children, initialvalues, ...props }: FormProps<FormValues>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [values, setValues] = useState(initialvalues);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await onSubmit?.(values as FormValues, e);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFieldChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // setValues((prevVals) => ({
    //   ...prevVals,
    //   [id]: value,
    // }));
  }, []);

  const value = useMemo(
    () => ({
      loading,
      values,
      errors,
      handleFieldChange,
    }),
    [loading]
  );

  return (
    <FormContext.Provider value={value}>
      <form onSubmit={handleSubmit} ref={ref} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export const FormProvider = forwardRef(FormProviderForwardingRef) as <FormValues>(
  props: FormProps<FormValues>
) => ReactElement | null;
