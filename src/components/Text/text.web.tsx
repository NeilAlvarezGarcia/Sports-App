import { ForwardedRef, forwardRef } from 'react';
import { TextProps } from './text';
import styled from 'styled-components';

function TextForwardingRef(
  { fontSize = 18, fontWeight = 400, textAlign = 'left', color = 'primary', ...props }: TextProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <StyledText
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      color={color}
      ref={ref}
      {...props}
    />
  );
}

const StyledText = styled('span').withConfig<TextProps>({
  shouldForwardProp: (prop) =>
    prop !== 'fontSize' && prop !== 'textAlign' && prop !== 'fontWeight' && prop !== 'color',
})(
  ({ fontSize, textAlign, fontWeight, color, theme }) => `
  color: ${theme.text[color as string]};
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  text-align: ${textAlign};
`
);

export const Text = forwardRef(TextForwardingRef);
