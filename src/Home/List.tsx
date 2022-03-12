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
          <h1>Sport List</h1>
          <div className="buttons">
              
          </div>
        </div>
        <p className='lastUpdate'>{lastUpdate()}</p>
        <div className="historycards">
          {historyData.map(data => (
            <CardHistory key={data.idSport} data={data}/>
          ))}
        </div>
      </div>
      <NavBar/>
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
    color: #c2c2c2;
    font-size: 1.3rem;
  }

  .historycards {
    height: 70%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    padding-bottom: 5rem;
  }

  nav {
    width: 100%;
  }
`;




export default History