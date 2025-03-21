import styled from 'styled-components';

export interface PropMode {
  readonly mode: string | undefined;
}

export const ContainerAuthentication = styled('div')<PropMode>`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerSecondary = styled('div')``;

export const ContainerCenter = styled('div')`
  width: 90%;
  height: 100%;
  padding-top: 4rem;
  display: flex;
  justify-content: center;
  margin: auto;
`;

export const ContainerCards = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  overflow-x: auto;
`;
