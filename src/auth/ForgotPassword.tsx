import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonComponent } from '../components/Button'
import { PropMode } from '../components/Container'
import { Error as ErrorComponent } from '../components/Error'
import { UseContext } from '../contextApi/ContextApi'
import { forgotPassword } from '../firebase-files/authentication'

const Login = () => {
    const {mode} = UseContext();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        setEmail(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!email) return setEmail('Email field cannot be empty.');

        setLoading(true);
        try {
            const {error} = await forgotPassword(email);

            if(error) throw new Error(error);

            setMessage('Check your email for further instructions');
            setEmail('');
            
            setLoading(false);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch(err: any) {
            setError(err.message);
        }

        setLoading(false);
    }

    useEffect(() => {
        document.title = document.title + ' - Forget Password';
    }, [])
      
  return (
    <ContainerLogin mode={mode}>
        <div className="container">
        
            <div className="header">
                <h1>Forget Password</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            {message && (
                <div className='message'>
                    <p>{message}</p>
                </div>
            )}
            {error && <ErrorComponent>{error}</ErrorComponent>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    User
                    <input type="email" id='email' value={email} onChange={handleChange} required/>
                </label>
                <p>Have already an account?<Link to='/login'> Login</Link></p>

                <ButtonComponent type='submit' disabled={loading}>Send email</ButtonComponent>
            </form>
        </div>
    </ContainerLogin>
  )
}

const ContainerLogin = styled.div<PropMode>`
    background-color: ${prop => prop.mode === 'light'? '#E5E5E5' : 'inherit'};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color:  ${prop => prop.mode === 'light'? '#000' : '#fff'};

    .container {
        width: 90%;
    }
    
    .header {
        text-align: center;

        h1 {
            font-size: 4.2rem;
            margin: 1rem 0;
        }
        p {
            font-size: 1.8rem;
            line-height: 148.02%;
            padding: 0 2rem;
            margin-bottom: 2rem;
        }
    }

    label {
        display: flex;
        flex-direction: column;
        background-color: ${prop => prop.mode === 'light'? '#fff' : '#2F2F43'};
        padding: 1rem 2rem;
        margin-bottom: 1rem;
        border-radius: 1.5rem;
        font-size: 1.4rem;
        
        input {
            background-color: ${prop => prop.mode === 'light'? '#fff' : '#2F2F43'};
            border: none;
            outline: none;
            margin-top: 1rem;
            font-size: 1.8rem;
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
    }

    .message {
        background-color: #16BD0B;
        color: #fff;
        text-align: center;
        font-size: 1.8rem;
        padding: 1.5rem 0;
        margin: 1rem 0;
        border-radius: 1rem;
    }
`;

export default Login