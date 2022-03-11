import styled from 'styled-components';

export interface PropMode {
    readonly mode: string | undefined;
}

export const MainContainer = styled.div<PropMode>`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: ${prop => prop.mode === 'light'? '#E5E5E5' : '#181828'};
    color: ${prop => prop.mode === 'light'? '#000' : '#fff'};
`;

export const ContainerAuthentication = styled.div<PropMode>`
    background-color: ${prop => prop.mode === 'light'? '#E5E5E5' : 'inherit'};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
        display: flex;
        flex-direction: column;
        background-color: ${prop => prop.mode === 'light'? '#fff' : '#2F2F43'};
        padding: .7rem 2rem;
        margin-bottom: 1.5rem;
        border-radius: 1.2rem;
        font-size: 1.3rem;
        
        input {
            background-color: inherit;
            margin-top: .5rem;
            font-size: 1.7rem;
        }
    }
    form p {
        margin: 1rem 0  5rem;
        a {
            color: #564D9E;
        }
    }
    a, button, p, label, input {
        color: ${prop => prop.mode === 'light'? '#232232' : '#FEFEFE'};
        border: none;
        outline: none;
    }
`

export const ContainerSecondary = styled.div`
    width: min(85%, 40rem);

    .header {
        text-align: center;

        h1 {
            font-size: 3.2rem;
            margin: 1rem 0;
        }
        p {
            font-size: 1.4rem;
            line-height: 148.02%;
            padding: 0 2rem;
            margin-bottom: 2rem;
        }
    }

    .link {
        margin-bottom: 1.5rem;
    }

    @media (min-width: 380px) {
        .header {
            h1 {
                font-size: 4.2rem;
            }
            p {
                font-size: 1.8rem;
                padding: 0  4rem;
            }
        }
    }
`;

export const ContainerCenter = styled.div`
    width: 90%;
    height: 100%;
    padding-top: 4rem;
    display: flex;
    justify-content: center;
    margin: auto;
`;

export const ContainerCards = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    overflow-x: hidden;
    scrollbar-width: 0;
`;