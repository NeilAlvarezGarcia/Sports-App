import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faClock, faHome } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { UseContext } from '../contextApi/ContextApi'
import { PropMode } from './Container'
import UserPortrait from './UserPortrait'

const NavBar = () => {
  const {mode} = UseContext();
  const linkActive = useMemo(() => ({
    color: mode === 'light' ? '#1A5BE1' : '#fff',
    backgroundColor: mode === 'light' ? '#FBFBFB' : '#1F1F31',
  }), [mode]);

  const active = ({isActive}: {isActive: boolean}) => isActive ? linkActive : {}

  return (
    <Nav mode={mode}>
        <NavLink to='/home' style={active}>
            <FontAwesomeIcon icon={faHome}/>
        </NavLink>
        <NavLink to='/history' style={active}>
            <FontAwesomeIcon icon={faClock}/>
        </NavLink>
        <NavLink to='/list' style={active}>
            <FontAwesomeIcon icon={faClipboardList}/>
        </NavLink>
        <NavLink to='/profile'>
            <UserPortrait width='4rem' height='4rem'/>
        </NavLink>
    </Nav>
  )
}

const Nav = styled.nav<PropMode>`
    background-color: ${prop => prop.mode === 'light'? '#fff' : '#2C2B3E'};
    padding: 0 1rem;
    margin: 2rem auto;
    border-radius: 24px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.7rem;

    a { 
        width: 18%;
        height: 100%;
        color: ${prop => prop.mode === 'light'? '#E5E5E5' : '#181828'};
        display: flex;
        place-content: center;
        padding: 2rem 0;
        border-radius: 1.5rem;
    }
`

export default NavBar