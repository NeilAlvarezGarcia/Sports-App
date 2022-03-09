import { updateEmail, updatePassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BackButton from '../components/BackButton'
import { ButtonComponent } from '../components/Button'
import { PropMode } from '../components/Container'
import { ContainerCenter } from '../components/ContainerCenter'
import { Error as ErrorComponent} from '../components/Error'
import { UseContext } from '../contextApi/ContextApi'
import { updateUserProfile } from '../firebase-files/authentication'
import { getExtraUserInformation, sendExtraUserInformation } from '../firebase-files/firestore'
import { uploadImageProfile} from '../firebase-files/storage'

interface typeForm {
    email?: string,
    password?: string,
    passwordConfirmation?: string,
    location?: string,
    photoURL?: File
    phoneNumber?: string,
    name?: string
}
export interface typeExtraData {
    phoneNumber?: string,
    location?: string,
    userId?: string
}
export interface typeDataUpdate  {
    displayName?: string,
    photoURL?: string
}

const SignUp = () => {
    const {mode, user} = UseContext();
    const {displayName, email} = user;
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [extraData, setExtraData] = useState<typeExtraData>();
    const [formState, setFormState] = useState<typeForm>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');

        const {value, files, name} = e.target;
        const newValue = name === 'photoURL' ? files?.[0] : value;

        setFormState(prevState => ({
            ...prevState,
            [name]: newValue
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        let updateData: typeDataUpdate = {}
        let updateExtraData: typeExtraData = {
            userId: user.uid
        }

        if(formState.email) {
            if(formState.email !== user.email) {
                updateEmail(user, formState.email);
            }
        }
        if(formState.password && formState.passwordConfirmation) {
            if(formState.password === formState.passwordConfirmation) {
                updatePassword(user, formState.password);
            }
        }
        if(formState.photoURL) {
            if(/\.(jpg|jpeg|png|svg)/g.test(formState.photoURL.name)) {
                const path = `/files/${user.uid}/image-profile`;
                uploadImageProfile(path, formState.photoURL);
            }
        }
        if(formState.phoneNumber) {
            if(/[0-9]{10}/.test(formState.phoneNumber)) {
                updateExtraData.phoneNumber = formState.phoneNumber;
            }
        }
        if(formState.name) {
            if(/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(formState.name)) {
                updateData.displayName = formState.name;
                updateUserProfile(updateData);
            }
        }
        if(formState.location) {
            if(/^[a-zA-ZÀ-ÿ\s]{5,50}/.test(formState.location)) {
                updateExtraData.location = formState.location;
            }
        }

        if(updateExtraData.location || updateExtraData.phoneNumber) {
            sendExtraUserInformation(user.uid, updateExtraData);
        }

        setLoading(false);
        navigate('/profile');
    }

    useEffect(() => {
        const setData = async () => {
            await setExtraData(await getExtraUserInformation(user.uid));
            setFormState({
                email: email, 
                name: displayName,
                phoneNumber: extraData?.phoneNumber,
                location: extraData?.location,
            })
        }
        setData();
        document.title = 'GreenRun Sports - Edit Profile';
    }, [displayName, email, extraData?.location, extraData?.phoneNumber, user])
      
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
                    <input type="file" id='photo' className='file' onChange={handleChange} name='photoURL'/>
                    <span>{formState?.photoURL?.name}</span>
                </label>
                <label htmlFor="name">
                    Name
                    <input type="text" id='name' autoComplete='off' value={formState.name} onChange={handleChange} name='name'/>
                </label>
                <label htmlFor="email">
                    Email
                    <input type="email" id='email' autoComplete='off' value={formState.email} onChange={handleChange} name='email'/>
                </label>
                <label htmlFor="phone">
                    Phone Number
                    <input type="phone" id='phone' autoComplete='off' value={formState.phoneNumber} onChange={handleChange} name='phoneNumber'/>
                </label>
                <label htmlFor="location">
                    Location
                    <input type="text" id='location' autoComplete='off' value={formState.location} onChange={handleChange} name='location'/>
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
        span {
            margin-top: .5rem;
            font-size: 1.8rem;
        }
        span, input {
            color: ${prop => prop.mode === 'light'? '#000' : '#fff'};
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