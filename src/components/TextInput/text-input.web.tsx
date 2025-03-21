import { ForwardedRef, forwardRef } from 'react';
import { TextInputProps } from './text-input';
import { TextInputControlled } from './components/text-input-controlled';
import { TextInputBase } from './components/text-input-base';

function TextInputForwardingRef(
  { name, ...props }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  if (name) {
    return <TextInputControlled name={name} ref={ref} {...props} />;
  }

  return <TextInputBase ref={ref} {...props} />;
}

export const TextInput = forwardRef(TextInputForwardingRef);
