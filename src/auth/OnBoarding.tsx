import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonComponent } from '../components/Button';
import { PropMode } from '../components/Container';
import { UseContext } from '../contextApi/ContextApi';
import { auth } from '../firebase-files/authentication';
import messi from '../images/mess.png';

const OnBoarding = () => {
    const navigate = useNavigate();
  const {mode} = UseContext();
  
  useEffect(() => {
    document.title = 'GreenRun Sports - OnBoarding';
    return onAuthStateChanged(auth, (user) => {
        if(user)  navigate('/home');
    });
}, [navigate])

  return (
    <Main mode={mode}>
        <ContainerText mode={mode}>
            <div className="text">
                <h1>Discover Your Best Sport With Us</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <Link to='/login'>
                <ButtonComponent>Login</ButtonComponent>
            </Link>
        </ContainerText>
    </Main>
  )
}

const Main = styled.div <PropMode>`
    background-color: inherit;
    display: flex;
    align-items: flex-end;
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(${messi});
    background-repeat: no-repeat;
    background-size: 95%;
    background-position: 5% 45%;
    
    @media (min-width: 380px) {
        background-position: 60% 55%;
        background-size: 110%;
    }
`
const ContainerText = styled.div<PropMode>`
    width: 100%;
    height: 45%;
    background-color: ${prop => prop.mode === 'light'? '#fff' : 'inherit'};
    border-radius: 3.6rem 3.6rem 0 0 ;
    color: #fff;
    display: inherit;
    flex-direction: column;
    gap: 30%;
    padding: 3rem;
    color: ${prop => prop.mode === 'light'? '#000' : '#fff'};

    .text {
        display: inherit;
        flex-direction: inherit;
        width: 80%;

        h1 {
            font-size: 2rem;
            margin: 1rem 1rem 1rem 0;
        }
        p {
            font-size: 1.4rem;
            line-height: 148.02%;
            color: ${prop => prop.mode === 'light'? '#000' : '#FEFEFE'};
        }
    }
    @media (min-width: 380px) {
        .text h1 {
            font-size: 2.8rem;
        }
        .text p {
            font-size: 1.8rem;
        }
    }

`


export default OnBoarding