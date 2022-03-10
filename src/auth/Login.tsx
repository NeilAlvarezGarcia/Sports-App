import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../components/Button'
import { ContainerAuthentication, ContainerSecondary } from '../components/Containers'
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
        document.title = 'GreenRun Sports - Login';
        return onAuthStateChanged(auth, (user) => {
            if(user)  navigate('/home');
        });
    }, [navigate])
      
  return (
    <ContainerAuthentication mode={mode}>
        <ContainerSecondary>
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
                <p className='link'>Don´t have an account?<Link to='/sign-up'> Sign up</Link></p>
                <ButtonComponent type='submit' disabled={loading}>Login</ButtonComponent>
            </form>
        </ContainerSecondary>
    </ContainerAuthentication>
  )
}

export default Login