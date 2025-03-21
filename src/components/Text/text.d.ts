import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

interface TextProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> {
  fontSize?: number;
  fontWeight?: number;
  textAlign?: 'left' | 'right' | 'center';
  color?: 'primary' | 'secondary';
}

function Text(props: TextProps): ReactElement | null;
