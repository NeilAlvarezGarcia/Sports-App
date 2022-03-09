import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonComponent } from '../components/Button'
import { PropMode } from '../components/Container'
import { Error } from '../components/Error'
import { UseContext } from '../contextApi/ContextApi'
import { auth, login } from '../firebase-files/authentication'

const Login = () => {
    const {mode} = UseContext();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');

        setFormState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!formState.email || !formState.password) return setError('No field can be empty.');

        setLoading(true);
        const res = await login(formState.email, formState.password);
        
        if(res) return setError(res.error);

        setLoading(false);
        navigate('/home');
    }

    useEffect(() => {
        document.title = document.title + ' - Login';
        return onAuthStateChanged(auth, (user) => {
            if(user)  navigate('/home');
        });
    }, [navigate])
      
  return (
    <ContainerLogin mode={mode}>
        <div className="container">
        
            <div className="header">
                <h1>Welcome</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            {error && <Error>{error}</Error>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    User
                    <input type="email" id='email' value={formState.email} onChange={handleChange} name='email' autoComplete='off' required/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" id='password' value={formState.password} onChange={handleChange} name='password' required/>
                </label>
                <Link to='/forgot-password'>Forget Password?</Link>
                <p>Don´t have an account?<Link to='/sign-up'> Sign up</Link></p>
                <ButtonComponent type='submit' disabled={loading}>Login</ButtonComponent>
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
        border: none;
        outline: none;
    }
`;

export default Login