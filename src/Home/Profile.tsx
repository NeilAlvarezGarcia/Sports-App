import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BackButton from '../components/BackButton'
import { ButtonComponent } from '../components/Button'
import { PropMode } from '../components/Container'
import { ContainerCenter } from '../components/ContainerCenter'
import UserPortrait from '../components/UserPortrait'
import { UseContext } from '../contextApi/ContextApi'
import { logout } from '../firebase-files/authentication'

const Profile = () => {
    const {user, mode} = UseContext();
    const navigate = useNavigate();
    const {displayName, email, phoneNumber, location} = user;
    console.log(user)

    const handleLogOut = async () => {
        await logout()

        navigate('/');
    }

  return (
    <ContainerCenter>
        <BackButton/>
        <ContainerProfile mode={mode}>
            <UserPortrait width='10rem' height='10rem'/>

            <div className="information">
                <p>
                    Name:
                    <span>{displayName}</span>
                </p>
                <p>
                    Email:
                    <span>{email}</span>
                </p>
                <p>
                    phoneNumber:
                    <span>{phoneNumber}</span>
                </p>
                <p>
                    Location:
                    <span>{location}</span>
                </p>
            </div>
            <Link to='/update-profile'>
                <ButtonComponent style={{marginRight: '2rem'}}>Edit Profile</ButtonComponent>
            </Link>
            <ButtonComponent onClick={handleLogOut}>Log Out</ButtonComponent>
        </ContainerProfile>
    </ContainerCenter>
  )
}

const ContainerProfile = styled.div<PropMode>`
    margin-top: 2rem;

    .letter {
        font-size: 4rem;
    }

    .information {
        margin: 3rem 0;

        p {
            height: 6rem;
            font-size: 1.5rem;
            background-color: ${prop => prop.mode === 'light'? '#fff' : '#2C2B3E'};
            color: #aaa;
            padding: 1rem 2rem;
            margin-bottom: 1.5rem;
            border-radius: 1rem;

            span {
                display: block;
                color: ${prop => prop.mode === 'light'? '#000' : '#fff'};
                font-size: 1.7rem;
                margin-top: .5rem;
            }
        }
    }
`;

export default Profile