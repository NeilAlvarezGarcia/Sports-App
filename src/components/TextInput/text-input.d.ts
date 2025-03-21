import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react';

interface TextInputProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'> {
  label?: string;
}

function TextInput(props: TextInputProps): ReactElement | null;
