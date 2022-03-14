import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import CardHistory from '../components/CardHistory';
import { SportSelected } from '../components/CardHome';
import NavBar from '../components/NavBar';
import { UseContext } from '../contextApi/ContextApi';
import { getSports } from '../firebase-files/firestore';

const History = () => {
  const {user} = UseContext();
  const [historyData, setHistoryData] = useState<SportSelected[]>([]);

  const fetchSportData = useCallback(async () => {
    setHistoryData(await getSports(user.uid));
  }, [user]);

  const lastUpdate = () => {
    if(historyData.length) {
      const createdAt = historyData[0].createdAt?.toDate();
      const [, month, day] = `${createdAt}`.split(' ');
      return `${day} ${month}`;
    } 
    return null;
  }

  useEffect(() => {
    fetchSportData();

    document.title = 'GreenRun Sports - History';
  }, [fetchSportData])

  return (
    <ConatainerHistory>
      <div className='top'>
        <BackButton/>

        <div className="history-title">
          <h1>History</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <p className='lastUpdate'>{lastUpdate()}</p>
        <div className="historycards">
          {historyData.length > 0 ? historyData.map(data => (
            <CardHistory key={data.idSport} data={data}/>
          )): (
            <p>There´s no history yet</p>
          )}
        </div>
      </div>
      <div className="container-navbar">
        <NavBar/>
      </div>
    </ConatainerHistory>
  )
}

const ConatainerHistory = styled.div`
  display: flex;
  flex-direction: column;
  width: 88%;
  height: 100%;
  margin: 0 auto;

  .top {
    flex: 2;
    padding-top: 4rem;
    margin-bottom: 2rem;
    overflow: hidden;
  }

  h1 {
        margin: 1.5rem 0 1rem;
  }

  .lastUpdate {
    margin: 1rem 0;
    font-size: 1.3rem;
  }

  .historycards {
    height: 70%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    overflow-y: auto;
    padding-bottom: 5rem;
    text-align: center;
    p {
      font-size: 2rem;
      margin-top: 2rem;
    }
  }

  nav {
    width: 100%;
  }

  @media (min-width: 480px) {
    .historycards {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 600px) {
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 4rem;
    
    .historycards {
      padding-right: 2rem;
      grid-template-rows: 8rem;
    }
    .top {
      height: 100%;
    }

    .container-navbar {
      max-height: 100%;
    }
    nav {
      height: 38.6rem;
      padding: 2rem 1.7rem;
      margin-left: -.3rem;
      margin-top: -1.7rem;
    }
  }

  @media (min-width: 950px) {
    .historycards {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;




export default History