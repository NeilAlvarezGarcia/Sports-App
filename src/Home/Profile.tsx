import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import { ButtonComponent } from '../components/OldButton';
import { PropMode } from '../components/Containers';
import { ContainerCenter } from '../components/Containers';
import UserPortrait from '../components/UserPortrait';
import { UseContext } from '../contextApi/ContextApi';
import { logout } from '../firebase/authentication';
import { extraDataType, getExtraUserInformation } from '../firebase/firestore';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
  const { user, mode } = UseContext();
  const navigate = useNavigate();
  const { displayName, email } = user;
  const [extraData, setExtraData] = useState<extraDataType>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogOut = async () => {
    await logout();

    navigate('/');
  };

  useEffect(() => {
    const setData = async () => {
      await setExtraData(await getExtraUserInformation(user.uid));
      setLoading(false);
    };
    setData();
    document.title = 'GreenRun Sports - Profile';
  }, [user]);

  return (
    <ContainerCenter>
      {!loading && (
        <RootContainer>
          <div>
            <BackButton />
            <ContainerProfile mode={mode}>
              <div className='portraitContainer'>
                <UserPortrait />
              </div>

              <div className='information'>
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
                  <span>{extraData?.phone}</span>
                </p>
                <p className='location'>
                  Location:
                  <span>{extraData?.location}</span>
                </p>
              </div>
              <Link to='/update-profile' className='sendUpdateProfileButton'>
                <ButtonComponent style={{ marginRight: '2rem' }}>Edit Profile</ButtonComponent>
              </Link>
              <ButtonComponent onClick={handleLogOut}>Log Out</ButtonComponent>
            </ContainerProfile>
          </div>
          <div className='breakwindow'>
            <UpdateProfile />
          </div>
        </RootContainer>
      )}
    </ContainerCenter>
  );
};

const RootContainer = styled('div')`
  width: 100%;
  height: 100%;
  .portraitContainer {
    width: 6rem;
    height: 6rem;
  }
  & > div {
    flex: 1;
  }
  .breakwindow {
    display: none;
  }

  @media (min-width: 760px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .breakwindow {
      display: block;
      margin-top: -5rem;
    }
  }
`;

const ContainerProfile = styled('div')<PropMode>`
  margin-top: 1rem;

  .letter {
    font-size: 4rem;
  }

  .information {
    margin: 2rem 0 1rem;

    p {
      height: 5rem;
      font-size: 1.3rem;
      background-color: ${(prop) => (prop.mode === 'light' ? '#fff' : '#2C2B3E')};
      color: #aaa;
      padding: 0.5rem 2rem;
      margin-bottom: 1.5rem;
      border-radius: 1rem;

      span {
        display: block;
        color: ${(prop) => (prop.mode === 'light' ? '#000' : '#fff')};
        font-size: 1.7rem;
        margin-top: 0.5rem;
      }
    }
    .location {
      text-transform: capitalize;
    }
  }

  @media (min-width: 756px) {
    .information {
      p {
        height: 6rem;
        font-size: 1.4rem;
        padding: 1rem 2rem;

        span {
          font-size: 1.9rem;
          margin-top: 0.5rem;
        }
      }
    }
    .sendUpdateProfileButton {
      display: none;
    }
  }
  @media (min-width: 900px) {
    .information {
      width: 90%;
    }
  }
  @media (min-width: 1100px) {
    .information {
      width: 75%;
    }
  }
`;

export default Profile;
