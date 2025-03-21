import { updateEmail, updatePassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import { ButtonComponent } from '../components/OldButton';
import { PropMode } from '../components/Containers';
import { ContainerCenter } from '../components/Containers';
import { Error } from '../components/Error';
import Message from '../components/Message';
import { UseContext } from '../contextApi/ContextApi';
import { updateUserProfile } from '../firebase/authentication';
import {
  extraDataType,
  getExtraUserInformation,
  sendExtraUserInformation,
} from '../firebase/firestore';
import { uploadImageProfile } from '../firebase/storage';

interface FieldType {
  value: string;
  border: string;
  files?: File;
  fileName?: string;
}

export interface typeExtraData {
  phone?: FieldType;
  location?: FieldType;
  userId?: string;
}
export interface typeDataUpdate {
  name?: FieldType;
  photo?: FieldType;
}
interface typeForm extends typeExtraData, typeDataUpdate {
  email?: FieldType;
  password?: FieldType;
  passwordConfirmation?: FieldType;
}

const SignUp = () => {
  const { mode, user } = UseContext();
  const { displayName, email } = user;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [extraData, setExtraData] = useState<extraDataType>();
  const [formState, setFormState] = useState<typeForm>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');

    const { name, value, files } = e.target;
    const newValue =
      name === 'photo'
        ? {
            value,
            files: files?.[0],
            fileName: files?.[0].name,
            border: '',
          }
        : {
            value,
            border: '',
          };

    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const setBorder = (name: string, state: FieldType | undefined, border: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...state,
        border,
      },
    }));
  };

  const handleError = () => {
    setLoading(false);
    setError('Check the fields marked in red to update the profile');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    let validationText: string = '';
    let emailValidated: string = '';
    let passwordValidated: string = '';
    let photoValidated: File | null = null;
    let nameValidated: string = '';
    let updateExtraData: typeExtraData = {
      userId: user.uid,
    };
    const regex = {
      name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      password: /^.{8,20}$/,
      email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      photo: /\.(jpg|jpeg|png|svg)/g,
      phone: /[0-9]{7,12}/,
      location: /^[a-zA-ZÀ-ÿ\s]{5,50}/,
    };

    if (formState?.email) {
      if (formState.email.value !== user.email) {
        if (regex.email.test(formState.email.value)) {
          emailValidated = formState.email.value;
          setBorder('email', formState.email, 'success');
          validationText = 'not error';
        } else {
          setBorder('email', formState.email, 'danger');
          validationText = 'error';
          handleError();
        }
      }
    }
    if (formState?.password && formState?.passwordConfirmation) {
      if (formState.password.value === formState.passwordConfirmation.value) {
        passwordValidated = formState.password.value;
        setBorder('password', formState.passwordConfirmation, 'success');
        setBorder('passwordConfirmation', formState.password, 'success');
        validationText = 'not error';
      } else {
        setBorder('password', formState.passwordConfirmation, 'danger');
        setBorder('passwordConfirmation', formState.password, 'danger');
        validationText = 'error';
        handleError();
      }
    }
    if (formState?.password && !formState?.passwordConfirmation) {
      setBorder('passwordConfirmation', formState.passwordConfirmation, 'danger');
      handleError();
      validationText = 'error';
    } else if (!formState?.password && formState?.passwordConfirmation) {
      setBorder('password', formState.password, 'danger');
      handleError();
      validationText = 'error';
    }

    if (formState?.photo) {
      if (
        formState.photo.fileName &&
        formState.photo.files &&
        regex.photo.test(formState.photo.fileName)
      ) {
        photoValidated = formState.photo.files;
        setBorder('photo', formState.photo, 'success');
        validationText = 'not error';
      } else {
        setBorder('photo', formState.photo, 'danger');
        handleError();
        validationText = 'error';
      }
    }
    if (formState?.phone?.value) {
      if (formState.phone.value !== extraData?.phone) {
        if (regex.phone.test(formState.phone.value)) {
          updateExtraData.phone = formState.phone;
          setBorder('phone', formState.phone, 'success');
          validationText = 'not error';
        } else {
          setBorder('phone', formState.phone, 'danger');
          handleError();
          validationText = 'error';
        }
      }
    }
    if (formState?.name) {
      if (formState.name.value !== displayName) {
        if (regex.name.test(formState.name.value)) {
          nameValidated = formState.name.value;
          setBorder('name', formState.name, 'success');
          validationText = 'not error';
        } else {
          setBorder('name', formState.name, 'danger');
          handleError();
          validationText = 'error';
        }
      }
    }
    if (formState?.location?.value) {
      if (formState.location.value !== extraData?.location) {
        if (regex.location.test(formState.location.value)) {
          updateExtraData.location = formState.location;
          setBorder('location', formState.location, 'success');
          validationText = 'not error';
        } else {
          setBorder('location', formState.location, 'danger');
          handleError();
          validationText = 'error';
        }
      }
    }

    if (validationText === 'error') return setLoading(false);
    if (!validationText) return navigate('/home');

    if (updateExtraData.location || updateExtraData.phone) {
      sendExtraUserInformation(user.uid, updateExtraData);
    }
    if (emailValidated) {
      updateEmail(user, emailValidated);
    }
    if (passwordValidated) {
      updatePassword(user, passwordValidated);
    }
    if (photoValidated) {
      const path = `/files/${user.uid}/image-profile`;
      uploadImageProfile(path, photoValidated);
    }
    if (nameValidated) {
      const dataUser = {
        displayName: formState?.name?.value,
      };
      updateUserProfile(dataUser);
    }

    setMessage('Profile updated');
    const selectNavigation = () => (window.innerWidth < 756 ? '/profile' : '/home');
    setTimeout(() => {
      navigate(selectNavigation());
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    const setData = async () => {
      setExtraData(await getExtraUserInformation(user.uid));
      setFormState({
        name: {
          value: displayName,
          border: '',
        },
        email: {
          value: email,
          border: '',
        },
        phone: {
          value: extraData?.phone ? extraData?.phone : '',
          border: '',
        },
        location: {
          value: extraData?.location ? extraData?.location : '',
          border: '',
        },
      });
    };
    setData();
    document.title = 'GreenRun Sports - Edit Profile';
  }, [displayName, email, extraData?.location, extraData?.phone, user]);

  return (
    <ContainerCenter>
      <ContainerUpdate mode={mode}>
        <div className='backButton'>
          <BackButton route='/profile' />
        </div>
        <div className='header'>
          <h1>Edit Profile</h1>
        </div>

        {message && <Message text={message} />}
        {error && <Error>{error}</Error>}
        <form onSubmit={handleSubmit}>
          <label className={formState?.photo?.border} htmlFor='photo'>
            Photo Profile
            <input
              type='file'
              id='photo'
              className='file'
              value={formState?.photo?.value}
              onChange={handleChange}
              name='photo'
            />
            <span>{formState?.photo?.fileName}</span>
          </label>
          <label className={formState?.name?.border} htmlFor='name'>
            Name
            <input
              type='text'
              id='name'
              autoComplete='off'
              value={formState?.name?.value}
              onChange={handleChange}
              name='name'
            />
          </label>
          <label className={formState?.email?.border} htmlFor='email'>
            Email
            <input
              type='email'
              id='email'
              autoComplete='off'
              value={formState?.email?.value}
              onChange={handleChange}
              name='email'
            />
          </label>
          <label className={formState?.phone?.border} htmlFor='phone'>
            Phone Number
            <input
              type='phone'
              id='phone'
              autoComplete='off'
              value={formState?.phone?.value}
              onChange={handleChange}
              name='phone'
            />
          </label>
          <label className={formState?.location?.border} htmlFor='location'>
            Location
            <input
              type='text'
              id='location'
              autoComplete='off'
              value={formState?.location?.value}
              onChange={handleChange}
              name='location'
            />
          </label>
          <label className={formState?.password?.border} htmlFor='password'>
            Password
            <input
              type='password'
              id='password'
              placeholder='Leave them blank to keep the same password'
              value={formState?.password?.value}
              onChange={handleChange}
              name='password'
            />
          </label>
          <label className={formState?.passwordConfirmation?.border} htmlFor='passwordConfirm'>
            Verify Password
            <input
              type='password'
              id='passwordConfirm'
              placeholder='Leave them blank to keep the same password'
              value={formState?.passwordConfirmation?.value}
              onChange={handleChange}
              name='passwordConfirmation'
            />
          </label>
          <ButtonComponent type='submit' disabled={loading}>
            Edit Profile
          </ButtonComponent>
        </form>
      </ContainerUpdate>
    </ContainerCenter>
  );
};

const ContainerUpdate = styled('div')<PropMode>`
  width: 95%;
  max-height: 100%;

  .header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      margin-top: 0;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    background-color: ${(prop) => (prop.mode === 'light' ? '#fff' : '#2F2F43')};
    color: ${(prop) => (prop.mode === 'light' ? '#aaa' : '#ddd')};
    height: 5rem;
    padding: 0.5rem 2rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    font-size: 1.3rem;
    border: thin solid transparent;

    &:first-of-type {
      cursor: pointer;
    }
    &:last-of-type {
      margin-bottom: 1.5rem;
    }
    span {
      margin-top: 0.5rem;
      font-size: 1.8rem;
    }
    span,
    input {
      color: ${(prop) => (prop.mode === 'light' ? '#000' : '#fff')};
    }
    input {
      background-color: ${(prop) => (prop.mode === 'light' ? '#fff' : '#2F2F43')};
      border: none;
      outline: none;
      margin-top: 0.5rem;
      font-size: 1.7rem;
      &::placeholder {
        font-size: 1.4rem;
      }
    }
    .file {
      display: none;
    }
  }
  .success {
    border: thin solid #37bc14;
  }
  .danger {
    border: thin solid #f4574b;
  }
  form {
    height: 100rem;
    overflow-y: auto;
    padding-bottom: 70rem;
  }

  @media (min-width: 756px) {
    label {
      height: 6rem;
      padding: 1rem 2rem;
      margin-bottom: 1.5rem;
      font-size: 1.4rem;
      span {
        font-size: 1.8rem;
      }
      input {
        font-size: 1.8rem;
      }
    }
    form {
      min-width: 120%;
      padding: 0 2rem 70rem;
    }
    .backButton {
      display: none;
    }
  }
`;

export default SignUp;
