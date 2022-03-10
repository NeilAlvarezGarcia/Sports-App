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
    top: 1.5rem;
    left: 1.5rem;
    z-index: 3;
    width: 4.5rem;
    height: 4.5rem;
    cursor: pointer;
    border-radius: 1.5rem;
    font-size: 2rem;
    background-color: ${prop => prop.mode === 'light'? '#fff' : '#2C2B3E'};
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    transform: ${prop => prop.mode === 'light' && 'rotateY(180deg)'};

    @media (min-width: 756px) {
      font-size: 2.5rem;
      width: 5rem;
      height: 5rem;
    }
`;

const Icon = styled(FontAwesomeIcon)`
    color: #F1D504;
`;

export default ModeButton