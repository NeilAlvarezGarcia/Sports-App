import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Card from '../components/CardHome'
import { ContainerCards } from '../components/Containers'
import ModeButton from '../components/ModeButton'
import NavBar from '../components/NavBar'
import axios from 'axios';
import IconAnimated from '../components/IconAnimated'

export interface typeSportData {
  idSport: string,
  strSport: string,
  strFormat: string,
  strSportThumb: string,
  strSportIconGreen: string,
  strSportDescription: string
}

export interface typeLikedCard {
  liked: boolean;
  image: string;
}

const Home = () => {
  const [sports, setSports] = useState<typeSportData[]>([]);
  const [likeCard, setLikeCard] = useState<typeLikedCard>({
    liked: false,
    image: ''
  });

  const fetchSportData = async () => {
    const URL = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';

    try {
      const res = await axios.get(URL);

      setSports(res.data.sports);
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
        <ModeButton/>
        {likeCard.liked && (
            <div className="like-card">
                <img src={likeCard.image} alt="liked-card"/>

                <IconAnimated/>
            </div>
          )}
        <div className="top-container">
          <ContainerCards className='cards'>
            {sports.map(sport => (
                <Card key={sport.idSport} sport={sport} setLikeCard={setLikeCard}/>
            ))}
          </ContainerCards>
        </div>
        <NavBar/>
    </ContainerHome>
  )
}

const showCard = keyframes`
  10% {transform: scale(1)}
  15% {transform: scale(1)}
  20% {transform: scale(1)}
  25% {transform: scale(1)}
  30% {transform: scale(1)}
  40% {transform: scale(1)}
  50% {transform: scale(1)}
  60% {transform: scale(1)}
  70% {transform: scale(1)}
  80% {transform: scale(1)}
  90% {transform: scale(1)}
  100% {transform: scale(0)}
`;

export const ContainerHome = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-container {
    flex: 2;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
  }

  .cards {
    scroll-snap-type: x mandatory;
  }
  .like-card {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: red;
    transition: ease all .3s;
    transform: scale(0);
    animation: ${showCard} 2s ease;

    img {
      min-width: 100%;
      min-height: 100%;
    }

    .icon-animation {
      position: absolute;
      top: 35%;
      left: 25%;
      width: 15rem;
      height: 15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: rgba(24, 24, 40, 0.24);
      transition: inherit;
      transform: inherit;
      
      @media (min-width: 320px) {left: 27%;}
      @media (min-width: 400px) {left: 30%;}
      @media (min-width: 500px) {left: 35%;}

      .second-level {
        width: 10rem;
        height: 10rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(24, 24, 40, 0.8);
        transition: inherit;
        transform: inherit;

        .like {
          background: linear-gradient(125.02deg, #236BFE -17.11%, #063BA8 98.58%);
          box-shadow: 0px 10px 25px rgba(35, 107, 254, 0.2);
          width: 6rem;
          height: 6rem;
          color: #fff;
          font-size: 3rem;
          border-radius: 50%;
          transition: inherit;
          transform: inherit;
        }
      }
    }
  }

  

  
  @media (min-width: 600px) {
    flex-direction: row-reverse;
    gap: 4rem;
    
    .top-container {
      height: 100%;
    }
    .like-card {
      display: none;
    }
  }
  @media (min-width: 800px) {
    .cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      padding: 0 2rem;
      scroll-snap-type: y mandatory;
    }
  }
  @media (min-width: 1100px) {
    .cards {
      grid-template-columns: repeat(3, 1fr);
      padding-bottom: 4rem;
    }
  }

  
`;

export default Home