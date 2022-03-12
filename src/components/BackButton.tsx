import React from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PropMode } from './Containers'
import { UseContext } from '../contextApi/ContextApi'

const BackButton = ({route}: {route?: string}) => {
  const {mode} = UseContext();

  return (
    <ArrowButton to={route ? route : '/home'} mode={mode}>
        <FontAwesomeIcon icon={faArrowLeft}/>   
    </ArrowButton>
  )
}

const ArrowButton = styled(Link)<PropMode>`
  color: ${prop => prop.mode === 'light' ? '#232232' : '#fff'};
  font-size: 2.6rem;
  
  @media (min-width: 500px) {
    font-size: 3.4rem;
  }
`;

export default BackButton