import styled from 'styled-components';

export interface PropMode {
    readonly mode: string | undefined;
}

export const Container = styled.div<PropMode>`
    width: 100vw;
    height: 100vh;
    background-color: ${prop => prop.mode === 'light'? '#E5E5E5' : '#181828'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: center;
    color: ${prop => prop.mode === 'light'? '#000' : '#fff'};
`;
