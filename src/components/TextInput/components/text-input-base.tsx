import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';
import { TextInputProps } from '../text-input';

export const TextInputBase = forwardRef(function TextInputBase(
  { label, name, id, ...props }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <Container>
      {label && <StyledLabel htmlFor={name || id}>{label}</StyledLabel>}
      <StyledInput ref={ref} id={name || id} {...props} />
    </Container>
  );
});

const Container = styled('div')`
  background: ${({ theme }) => theme.background.input};
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled('label')`
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.secondary};
  opacity: 0.6;
`;

const StyledInput = styled('input')`
  background: ${({ theme }) => theme.transparent};
  color: ${({ theme }) => theme.text.primary};
  font-size: 18px;
  border: none;
  outline: none;
`;
