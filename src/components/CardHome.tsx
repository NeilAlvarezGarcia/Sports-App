import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import styled from 'styled-components'
import { UseContext } from '../contextApi/ContextApi'
import { storeSports } from '../firebase-files/firestore'
import { typeSportData } from '../Home/Home'
import { PropMode } from './Containers'

interface Prop {
  sport: typeSportData
}

export interface SportSelected {
  idSport: string,
  strSport: string,
  strSportThumb: string,
  type: string,
  createdAt?: any
}

const Card: FC<Prop> = ({sport}) => {
  const {mode, user} = UseContext();

  const handleClick = async (type: string) => {
    const {strSport, strSportThumb, idSport} = sport;

    const sportReacted: SportSelected = {
      type,
      idSport: user.uid + idSport,
      strSport, 
      strSportThumb, 
    }

    await storeSports(user.uid, sportReacted);
  }

  return (
    <ContainerCard mode={mode}>
      <div className="badge">
        <img src={sport.strSportIconGreen} alt={sport.strSport}/>  
      </div>

      <div className="container-image">
        <img src={sport.strSportThumb} alt={sport.strSport}/>
        <h2>{sport.strSport}</h2>
      </div>

      <div className="container-buttons">
        <button className='dislike' onClick={() => handleClick('dislike')}>
          <FontAwesomeIcon icon={faTimes}/>
        </button>
        <button className='like' onClick={() => handleClick('like')}>
          <FontAwesomeIcon icon={faHeart}/>
        </button>
      </div>
    </ContainerCard>
  )
}

const ContainerCard = styled.div<PropMode>`
  min-height: 100%;
  position: relative;
  scroll-snap-align:  center;
  scroll-snap-stop: always;

  .badge {
    position: absolute;
    width: 4.5rem;
    height: 4.5rem;
    background-color: rgba(34, 34, 67, 0.3);
    top: 1.5rem;
    right: 1.5rem;
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    z-index: 3;

    img {
      background-color: #fff;
      max-width: 70%;
      border-radius: 50%;
    }
  }

  .container-image {
    height: 75%;
    position: relative;
    overflow: hidden;
    border-radius: 0 0 3rem 3rem;

    img {
      min-width: 100%;
      min-height: 100%;
      object-fit: contain;
    }

    h2 {
      color: #fff;
      font-size: 3rem;
      position: absolute;
      height: 22%;
      line-height: 3.2;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-left: 5%;
      background: linear-gradient(to top, #000 45%, transparent);
    }
  }

  .container-buttons {
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;

    button {
      border-radius: 50%;
    }

    .dislike {
      background: ${prop => prop.mode === 'light' ? '#fff' : '#222243'};
      box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
      width: 4rem;
      height: 4rem;
      color: ${prop => prop.mode === 'light' ? '#D36060' : '#fff'};
    }

    .like {
      background: linear-gradient(125.02deg, #236BFE -17.11%, #063BA8 98.58%);
      box-shadow: 0px 10px 25px rgba(35, 107, 254, 0.2);
      width: 6rem;
      height: 6rem;
      color: #fff;
      font-size: 3rem;
    }
  }
`;

export default Card