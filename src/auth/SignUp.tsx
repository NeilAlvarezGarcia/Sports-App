import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../components/Button'
import { ContainerAuthentication, ContainerSecondary} from '../components/Containers'
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
    <ContainerAuthentication mode={mode}>
        <ContainerSecondary>
            <div className="header">
                <h1>Sign Up</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            {error && <ErrorComponent>{error}</ErrorComponent>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    User
                    <input type="email" id='email' placeholder='example@gmail.com' autoComplete='off' value={formState.email} onChange={handleChange} name='email' required/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" id='password' placeholder='password123' value={formState.password} onChange={handleChange} name='password' required/>
                </label>
                <label htmlFor="passwordConfirm">
                    Verify Password
                    <input type="password" id='passwordConfirm' placeholder='password123' value={formState.passwordConfirmation} onChange={handleChange} name='passwordConfirmation' required/>
                </label>
                <p className='link'>Have already an account?<Link to='/login' className='underline'> Login</Link></p>
                <ButtonComponent type='submit' disabled={loading}>Sign up</ButtonComponent>
            </form>
        </ContainerSecondary>
    </ContainerAuthentication>
  )
}

export default SignUp