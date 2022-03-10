import styled from 'styled-components';
import { UseContext } from '../contextApi/ContextApi'


const UserPortrait = () => {
  const {user, mode} = UseContext();
  const {photoURL, displayName, email} = user;
    const letter = displayName ? displayName.substring(0, 1).toUpperCase() : email.substring(0, 1).toUpperCase();

    return (
        <Profile mode={mode}>
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

interface divProp {
    mode: string
}

const Profile = styled.div<divProp>`
    overflow: hidden;
    border-radius: 50%;
    max-height: 100%;
    min-height: 100%;
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
        max-width: 105%;
    }

`;

export default UserPortrait