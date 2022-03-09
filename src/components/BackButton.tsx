import React from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PropMode } from './Container'
import { UseContext } from '../contextApi/ContextApi'

const BackButton = () => {
  const {mode} = UseContext();

  return (
    <ArrowButton to='/home' mode={mode}>
        <FontAwesomeIcon icon={faArrowLeft}/>   
    </ArrowButton>
  )
}

const ArrowButton = styled(Link)<PropMode>`
    color: ${prop => prop.mode === 'light' ? '#232232' : '#fff'};
    font-size: 3.5rem;
`;

export default BackButton