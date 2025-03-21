import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faClock, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { UseContext } from '../contextApi/ContextApi';
import { PropMode } from './Containers';
import UserPortrait from './UserPortrait';

const NavBar = () => {
  const { mode } = UseContext();
  const linkActive = useMemo(
    () => ({
      color: mode === 'light' ? '#1A5BE1' : '#fff',
      backgroundColor: mode === 'light' ? '#FBFBFB' : '#1F1F31',
    }),
    [mode]
  );

  const active = ({ isActive }: { isActive: boolean }) => (isActive ? linkActive : {});

  return (
    <NavBarContainer mode={mode}>
      <nav>
        <NavLink to='/home' style={active}>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink to='/history' style={active}>
          <FontAwesomeIcon icon={faClock} />
        </NavLink>
        <NavLink to='/list' style={active}>
          <FontAwesomeIcon icon={faClipboardList} />
        </NavLink>
        <NavLink to='/profile'>
          <UserPortrait />
        </NavLink>
      </nav>
    </NavBarContainer>
  );
};

const NavBarContainer = styled('nav')<PropMode>`
  width: 88%;
  margin: 0 auto;
  padding: 0 0 1.5rem 0;
  height: 8rem;
  background-color: inherit;

  nav {
    background-color: ${(prop) => (prop.mode === 'light' ? '#fff' : '#2C2B3E')};
    padding: 0 1.2rem;
    border-radius: 2rem;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2.2rem;

    a {
      width: 4.5rem;
      height: 4.5rem;
      color: ${(prop) => (prop.mode === 'light' ? '#E5E5E5' : '#181828')};
      display: flex;
      place-content: center;
      place-items: center;
      border-radius: 1.2rem;
      transition: all ease 0.3s;
    }
    a:hover {
      color: ${(prop) => (prop.mode === 'light' ? '#1A5BE1' : '#fff')};
      background-color: ${(prop) => (prop.mode === 'light' ? '#FBFBFB' : '#1F1F31')};
    }
    span {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 600px) {
    width: 7.5rem;
    height: 40rem;
    margin-left: 1rem;

    nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 2rem 1.2rem;
      font-size: 2.4rem;
    }
  }
`;

export default NavBar;
