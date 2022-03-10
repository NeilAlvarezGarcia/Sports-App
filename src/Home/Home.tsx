import React, { useEffect } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import { ContainerCards } from '../components/Containers'
import ModeButton from '../components/ModeButton'
import NavBar from '../components/NavBar'

const Home = () => {
  useEffect(() => {
    document.title = 'GreenRun Sports - Home';
  }, [])

  return (
    <ContainerHome>
        <ModeButton/>
        <ContainerCards className='first-container'>
          <Card/>
        </ContainerCards>
        <NavBar/>
    </ContainerHome>
  )
}

const ContainerHome = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .first-container {
    flex: 1;
  }
`;

export default Home