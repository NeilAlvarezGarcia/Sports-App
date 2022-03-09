import { faCloudSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styled from 'styled-components'
import { UseContext } from '../contextApi/ContextApi';
import { PropMode } from './Containers';

const ModeButton = () => {
  const {mode, changeMode} = UseContext();
  
  const handleClick = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    changeMode(newMode);
  }

  return (
    <Button mode={mode} onClick={handleClick}>
        <Icon icon={mode === 'light' ? faMoon : faCloudSun}/>
    </Button>
  )
}

const Button = styled.button<PropMode>`
    position: absolute;
    border: none;
    top: 3rem;
    left: 2.5rem;
    z-index: 3;
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    border-radius: 1.8rem;
    font-size: 2.5rem;
    background-color: ${prop => prop.mode === 'light'? '#fff' : '#2C2B3E'};
`;

const Icon = styled(FontAwesomeIcon)`
    color: #F1D504;
`;

export default ModeButton