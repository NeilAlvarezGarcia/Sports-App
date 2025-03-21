import { useForm } from './use-form';

export const useFormField = (name: string) => {
  const { values, handleFieldChange } = useForm();

  const field = values[name];

  if (!field) {
    throw new Error('Field was not found.');
  }

  return { field, handleFieldChange };
};
