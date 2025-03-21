import { useContext } from 'react';
import { FormContext } from '../providers/form-provider';

export const useForm = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm mus be used within a FormProvidedr');
  }

  return context;
};
