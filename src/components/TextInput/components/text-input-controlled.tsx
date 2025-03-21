import { ForwardedRef, forwardRef } from 'react';
import { TextInputProps } from '../text-input';
import { TextInputBase } from './text-input-base';
import { useFormField } from '../../form/hooks/use-form-field';

export const TextInputControlled = forwardRef(function TextInputControled(
  { name, ...props }: Omit<TextInputProps, 'name'> & Required<Pick<TextInputProps, 'name'>>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { field, handleFieldChange } = useFormField(name);

  return <TextInputBase value={field} onChange={handleFieldChange} ref={ref} {...props} />;
});
