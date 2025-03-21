import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import MainListSports from '../components/MainListSports';
import NavBar from '../components/NavBar';
import Teams from '../components/Teams';

const History = () => {
  useEffect(() => {
    document.title = 'GreenRun Sports - Lists';
  }, []);

  return (
    <ConatainerList>
      <div className='top'>
        <BackButton />

        <div className='history-title'>
          <h1>Sport List</h1>
        </div>

        <Routes>
          <Route index element={<MainListSports />} />
          <Route path=':sport' element={<Teams />} />
        </Routes>
      </div>
      <div className='container-navbar'>
        <NavBar />
      </div>
    </ConatainerList>
  );
};

const ConatainerList = styled('div')`
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

  nav {
    width: 100%;
  }

  @media (min-width: 600px) {
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 4rem;

    .top {
      height: 100%;
    }

    .container-navbar {
      max-height: 100%;
    }
    nav {
      height: 38.6rem;
      padding: 2rem 1.7rem;
      margin-left: -0.3rem;
      margin-top: -1.7rem;
    }
  }
`;

export default History;
