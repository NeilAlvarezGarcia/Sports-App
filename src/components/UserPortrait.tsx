import React, { FC } from 'react'
import styled from 'styled-components';
import { UseContext } from '../contextApi/ContextApi'

interface Prop {
    width: string,
    height: string
}

const UserPortrait: FC<Prop> = ({width, height}) => {
  const {user, mode} = UseContext();
  const {photoURL, displayName, email} = user;
    const letter = displayName ? displayName.substring(0, 1).toUpperCase() : email.substring(0, 1).toUpperCase();

    return (
        <Profile width={width} height={height} mode={mode}>
            {photoURL ? (
                <img src={photoURL} alt='profile' className='img-fluid' style={{
                    objectFit: 'cover',
                }}/>
            ) : ( 
                <span className='letter'>{letter}</span>
            )}
        </Profile>
    )
}

interface divProp extends Prop {
    mode: string
}

const Profile = styled.div<divProp>`
    overflow: hidden;
    border-radius: 50%;
    width: ${prop => prop.width};
    height: ${prop => prop.height};
    display: flex;
    place-items: center;
    place-content: center;
    background-color: ${props => props.mode === 'light' ? '#222243' : "#fff"};
    font-weight: bold;

    span {
        color: ${props => props.mode === 'light' ? "#fff" : '#222243'};
    }
    img {
        object-fit: cover;
    }

`;

export default UserPortrait