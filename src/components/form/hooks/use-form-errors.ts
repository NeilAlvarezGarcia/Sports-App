import { useContext } from 'react';
import { FormContext } from '../providers/form-provider';

export const useFormErrors = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormErrors mus be used within a FormProvidedr');
  }

  return context.errors;
};
