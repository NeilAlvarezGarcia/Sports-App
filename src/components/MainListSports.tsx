import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UseContext } from '../contextApi/ContextApi';
import { getSports } from '../firebase/firestore';
import CardHistory from './CardHistory';
import { SportSelected } from './CardHome';
import { PropMode } from './Containers';

const MainListSports = () => {
  const { user, mode } = UseContext();
  const [historyData, setHistoryData] = useState<SportSelected[]>([]);
  const [noData, setNoData] = useState(false);

  const fetchSportData = async (type: string) => {
    setNoData(false);
    const res = await getSports(user.uid);

    const filteredData = res.filter((data: SportSelected) => data.type === type);

    if (filteredData.length === 0) return setNoData(true);

    setHistoryData(filteredData);
  };
  return (
    <MainListContainer mode={mode}>
      <p>Check sports and the teams of the diferents countries.</p>
      <div className='buttons'>
        <button className='likes' onClick={() => fetchSportData('like')}>
          Likes Sports <FontAwesomeIcon icon={faHeart} className='icon' />
        </button>
        <button className='dislikes' onClick={() => fetchSportData('dislike')}>
          Dislikes Sports <FontAwesomeIcon icon={faTimes} className='icon' />
        </button>
      </div>
      {noData && <p className='center'>There´s nothing to show</p>}
      <div className='list-reacted-cards'>
        {historyData.length > 0 &&
          historyData.map((data) => (
            <Link to={`${data.strSport}`} key={data.idSport}>
              <CardHistory data={data} />
            </Link>
          ))}
      </div>
    </MainListContainer>
  );
};

const MainListContainer = styled('div')<PropMode>`
  .center {
    text-align: center;
    margin-top: 3rem;
  }
  .list-reacted-cards {
    height: 20rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    overflow-y: auto;
    padding-bottom: 2rem;
    text-align: center;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    margin: 1.5rem 0;
    height: 100%;

    button {
      width: 100%;
      padding: 1rem 1.5rem;
      border-radius: 1rem;
      background-color: ${(prop) => (prop.mode === 'light' ? '#fff' : '#2C2B3E')};
      color: ${(prop) => (prop.mode === 'light' ? '#181828' : '#fff')};
      .icon {
        color: #f4574b;
      }
    }
  }
  @media (min-width: 370px) {
    .list-reacted-cards {
      height: 27rem;
    }
    .buttons {
      flex-direction: row;
    }
  }
  @media (min-width: 600px) {
    .list-reacted-cards {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 8rem;
      gap: 2rem;
      padding-right: 4rem;
    }
  }
  @media (min-width: 950px) {
    .list-reacted-cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 950px) {
    .list-reacted-cards {
      grid-template-columns: repeat(4, 1fr);
      height: 40rem;
    }
  }
`;

export default MainListSports;
