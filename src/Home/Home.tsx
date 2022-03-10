import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import { ContainerCards } from '../components/Containers'
import ModeButton from '../components/ModeButton'
import NavBar from '../components/NavBar'
import axios from 'axios';

export interface typeSportData {
  idSport: string,
  strSport: string,
  strFormat: string,
  strSportThumb: string,
  strSportIconGreen: string,
  strSportDescription: string
}

const Home = () => {
  const [sports, setSports] = useState<typeSportData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSportData = async () => {
    const URL = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';

    try {
      const res = await axios.get(URL);

      setSports(res.data.sports);
      setLoading(false);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchSportData();

    document.title = 'GreenRun Sports - Home';
  }, [])

  return (
    <ContainerHome>
      {!loading && (
        <>
          <ModeButton/>
            <ContainerCards className='cards'>
              {sports.map(sport => (
                  <Card key={sport.idSport} sport={sport}/>
              ))}
            </ContainerCards>
          <NavBar/>
        </>
      )}
    </ContainerHome>
  )
}

const ContainerHome = styled.div`
  height: 100%;
  padding-bottom: 2rem; 
  display: flex;
  flex-direction: column;
  align-items: center;

  .cards {
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
  }
`;

export default Home