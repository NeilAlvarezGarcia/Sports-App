import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BackButton from '../components/BackButton'
import { ButtonComponent } from '../components/Button'
import { PropMode } from '../components/Container'
import { ContainerCenter } from '../components/ContainerCenter'
import { Error as ErrorComponent} from '../components/Error'
import { UseContext } from '../contextApi/ContextApi'

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
        
        setLoading(false);
    }

    useEffect(() => {
        document.title = document.title + ' - SignUp';
    }, [navigate])
      
  return (
    <ContainerCenter>
        <BackButton/>
        <ContainerLogin mode={mode}>
            <div className="header">
                <h1>Edit Profile</h1>
            </div>

            {error && <ErrorComponent>{error}</ErrorComponent>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="photo">
                    Photo Profile
                    <input type="file" id='photo' className='file'/>
                    <span></span>
                </label>
                <label htmlFor="email">
                    Email
                    <input type="email" id='email' autoComplete='off' value={formState.email} onChange={handleChange} name='email'/>
                </label>
                <label htmlFor="phone">
                    Phone Number
                    <input type="phone" id='phone' autoComplete='off'/>
                </label>
                <label htmlFor="location">
                    Location
                    <input type="text" id='location' autoComplete='off'/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" id='password' placeholder='Leave them blank to keep the same password' value={formState.password} onChange={handleChange} name='password'/>
                </label>
                <label htmlFor="passwordConfirm">
                    Verify Password
                    <input type="password" id='passwordConfirm' placeholder='Leave them blank to keep the same password' value={formState.passwordConfirmation} onChange={handleChange} name='passwordConfirmation'/>
                </label>
                <ButtonComponent type='submit' disabled={loading}>Edit Profile</ButtonComponent>
            </form>
        </ContainerLogin>
    </ContainerCenter>
  )
}

const ContainerLogin = styled.div<PropMode>`
    background-color: ${prop => prop.mode === 'light'? '#E5E5E5' : 'inherit'};
    height: 100%;
    width: 100%;
    color:  ${prop => prop.mode === 'light'? '#000' : '#fff'};
    
    .header {
        text-align: center;
        margin-bottom: 2rem;

        h1 {
            font-size: 3.2rem;
        }
    }

    label {
        display: flex;
        flex-direction: column;
        background-color: ${prop => prop.mode === 'light'? '#fff' : '#2F2F43'};
        height: 6rem;
        padding: 1rem 2rem;
        margin-bottom: 1rem;
        border-radius: 1.5rem;
        font-size: 1.4rem;
        &:last-of-type {
            margin-bottom: 3rem;
        }
        input {
            background-color: ${prop => prop.mode === 'light'? '#fff' : '#2F2F43'};
            border: none;
            outline: none;
            margin-top: .5rem;
            font-size: 1.8rem;
            &::placeholder {
                font-size: 1.4rem;
            } 
        }
        .file {
            display: none;
        }
    }
`;

export default SignUp