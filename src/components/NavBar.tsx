import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faClock, faHome } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { UseContext } from '../contextApi/ContextApi'
import { PropMode } from './Containers'
import UserPortrait from './UserPortrait'

const NavBar = () => {
  const {mode} = UseContext();
  const linkActive = useMemo(() => ({
    color: mode === 'light' ? '#1A5BE1' : '#fff',
    backgroundColor: mode === 'light' ? '#FBFBFB' : '#1F1F31',
  }), [mode]);

  const active = ({isActive}: {isActive: boolean}) => isActive ? linkActive : {}

  return (
    <NavBarContainer mode={mode}>
        <nav>
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
                <UserPortrait/>
            </NavLink>
        </nav>
    </NavBarContainer>
  )
}

const NavBarContainer = styled.nav<PropMode>`
    width: 88%;
    margin: 0 auto;
    padding: 0 0 1.5rem 0;
    height: 8rem;
    background-color: inherit;

    nav {
        background-color: ${prop => prop.mode === 'light'? '#fff' : '#2C2B3E'};
        padding: 0 1.2rem;
        border-radius: 2rem;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.8rem;
    
        a { 
            width: 4.5rem;
            height: 4.5rem;
            color: ${prop => prop.mode === 'light'? '#E5E5E5' : '#181828'};
            display: flex;
            place-content: center;
            place-items: center;
            border-radius: 1.2rem;
        }
        span {
            font-size: 2.5rem;
        }
    }
`

export default NavBar