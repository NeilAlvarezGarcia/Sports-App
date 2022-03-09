import styled from 'styled-components'

export const ButtonComponent = styled.button`
  background: linear-gradient(99deg, #236BFE 6.69%, #0D4ED3 80.95%);
  box-shadow: 0px 4px 30px rgba(34, 105, 251, 0.8);
  border-radius: 1.5rem;
  padding: 1.5rem 0;
  width: 10.2rem;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff !important;
  
  @media (min-width: 380px) {
    border-radius: 2.5rem;
    padding: 2.2rem 0;
    width: 12.2rem;
  }
`;
