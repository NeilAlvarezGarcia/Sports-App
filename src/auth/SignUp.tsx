import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonComponent } from '../components/Button'
import { PropMode } from '../components/Container'
import { Error as ErrorComponent} from '../components/Error'
import { UseContext } from '../contextApi/ContextApi'
import { auth, signUp } from '../firebase-files/authentication'

const SignUp = () => {
    const {mode} = UseContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');

        setFormState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const regexPassword = /^.{4,12}$/;

        if(!regexPassword.test(formState.passwordConfirmation)) {
            return setError('Length of the password wrong');
        } else if(formState.password !== formState.passwordConfirmation) return setError('The passwords must match each other.')

        setLoading(true);
        try {
            const res = await signUp(formState.email, formState.passwordConfirmation);
            if(res) throw new Error(res);

            navigate('/home');
        } catch(err: any) {
            setError(err.message);
        }
        
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'GreenRun Sports - SignUp';

        return onAuthStateChanged(auth, (user) => {
            if(user)  navigate('/home');
        });
    }, [navigate])
      
  return (
    <ContainerLogin mode={mode}>
        <div className="container">
        
            <div className="header">
                <h1>Sign Up</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            {error && <ErrorComponent>{error}</ErrorComponent>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    User
                    <input type="email" id='email' autoComplete='off' value={formState.email} onChange={handleChange} name='email' required/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" id='password' value={formState.password} onChange={handleChange} name='password' required/>
                </label>
                <label htmlFor="passwordConfirm">
                    Verify Password
                    <input type="password" id='passwordConfirm' value={formState.passwordConfirmation} onChange={handleChange} name='passwordConfirmation' required/>
                </label>
                <p>Have already an account?<Link to='/login'> Login</Link></p>
                <ButtonComponent type='submit' disabled={loading}>Sign up</ButtonComponent>
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
`;

export default SignUp