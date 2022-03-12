import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../components/Button'
import { ContainerAuthentication, ContainerSecondary } from '../components/Containers'
import { Error as ErrorComponent } from '../components/Error'
import Message from '../components/Message'
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
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch(err: any) {
            setError(err.message);
        }
        setLoading(false);

    }

    useEffect(() => {
        document.title = 'GreenRun Sports - Forget Password';
    }, [])
      
  return (
    <ContainerAuthentication mode={mode}>
        <ContainerSecondary>
        
            <div className="header">
                <h1>Forget Password</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            {message && <Message text={message}/>}
            {error && <ErrorComponent>{error}</ErrorComponent>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    User
                    <input type="email" id='email' value={email} onChange={handleChange} required/>
                </label>
                <p className='link'>Have already an account?<Link to='/login' className='underline'> Login</Link></p>

                <ButtonComponent type='submit' disabled={loading}>Send email</ButtonComponent>
            </form>
        </ContainerSecondary>
    </ContainerAuthentication>
  )
}

export default Login