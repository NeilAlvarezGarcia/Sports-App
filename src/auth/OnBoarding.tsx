import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonComponent } from '../components/Button';
import { PropMode } from '../components/Containers';
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
        <div className='containerText'>
            <div className="text">
                <h1>Discover Your Best Sport With Us</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <Link to='/login'>
                <ButtonComponent>Login</ButtonComponent>
            </Link>
        </div>
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
    background-size: contain;
    background-position: 0;

    .containerText {
        width: 100%;
        height: 45%;
        background-color: ${prop => prop.mode === 'light'? '#fff' : 'inherit'};
        border-radius: 3.6rem 3.6rem 0 0 ;
        display: inherit;
        flex-direction: column;
        justify-content: space-around;
        padding: 2rem 3rem;
        color: ${prop => prop.mode === 'light'? '#000' : '#fff'};
    }

    .text {
        display: inherit;
        flex-direction: inherit;
        width: 90%;

        h1 {
            font-size: 2rem;
            margin: 1rem  0;
        }
        p {
            font-size: 1.2rem;
            line-height: 148.02%;
        }
    }
    @media (min-width: 380px) {
        .text {
            width: 80%;
            h1 {
                font-size: 2.8rem;
            }
            p {
                font-size: 1.8rem;
            }
        }
    }
    @media (min-width: 500px) {
        justify-content: flex-end;

        .text {
            width: 100%;
        }

        .containerText {
            width: 50%;
            height: 100%;
            border-radius: 3.6rem 0 0 3.6rem;
            box-shadow: 0 0 20px rgba(0, 0, 0, .4);
        }
    }
    @media (min-width: 860px) {
        .text {
            width: 70%;
        }
    }
`;


export default OnBoarding