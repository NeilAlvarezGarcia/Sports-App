import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UseContext } from '../contextApi/ContextApi';
import { storeSports } from '../firebase/firestore';
import { typeLikedCard, typeSportData } from '../Home/Home';
import { PropMode } from './Containers';
import IconAnimated from './IconAnimated';

interface Prop {
  sport: typeSportData;
  setLikeCard: React.Dispatch<typeLikedCard>;
}

export interface SportSelected {
  idSport: string;
  strSport: string;
  strSportThumb: string;
  type: string;
  createdAt?: any;
}

const Card: FC<Prop> = ({ sport, setLikeCard }) => {
  const { mode, user } = UseContext();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [image, setImage] = useState<string>('');

  const handleClick = async (type: string) => {
    const { strSport, strSportThumb, idSport } = sport;

    const sportReacted: SportSelected = {
      type,
      idSport: user.uid + idSport,
      strSport,
      strSportThumb,
    };

    if (type === 'like') {
      setLikeCard({
        liked: true,
        image: image,
      });
      setLiked(true);

      setTimeout(() => {
        setLikeCard({
          liked: false,
          image: '',
        });
        setLiked(false);
      }, 2100);
    }

    await storeSports(user.uid, sportReacted);
  };

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=21036208-560fd16570d6cd9d464a82eef&q=${sport.strSport}&per_page=5&image_type=photo`
      )
      .then((res) => {
        const newImages: string[] = [];

        res.data.hits.forEach((data: any) => newImages.push(data.largeImageURL));

        if (!newImages.length) return setImage(sport.strSportThumb);
        const newImage = newImages[Math.floor(Math.random() * newImages.length)];

        if (!newImage) setImage(sport.strSportThumb);

        setImage(newImage);
      });
  }, [sport]);

  return (
    <ContainerCard mode={mode}>
      <div className='badge'>
        <img src={sport.strSportIconGreen} alt={sport.strSport} />
      </div>

      <div className='container-image' onClick={() => navigate(`/list/${sport.strSport}`)}>
        <img src={image} alt={sport.strSport} />
        <h2>{sport.strSport}</h2>

        <div className='liked-card'>{liked && <IconAnimated />}</div>
      </div>

      <div className='container-buttons'>
        <button className='dislike' onClick={() => handleClick('dislike')}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button className='like' onClick={() => handleClick('like')}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </ContainerCard>
  );
};

const ContainerCard = styled('div')<PropMode>`
  min-width: 100%;
  position: relative;
  scroll-snap-align: center;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    cursor: pointer;

    img {
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
    }

    h2 {
      color: #fff;
      position: absolute;
      height: 22%;
      line-height: 4.2;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-left: 5%;
      background: linear-gradient(to top, #000 45%, transparent);
      user-select: none;
    }

    .liked-card {
      display: none;
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
      transition: ease all 0.3s;

      &:hover {
        transform: scale(1.07);
      }
    }

    .dislike {
      background: ${(prop) => (prop.mode === 'light' ? '#fff' : '#222243')};
      box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
      width: 4rem;
      height: 4rem;
      color: ${(prop) => (prop.mode === 'light' ? '#D36060' : '#fff')};
    }

    .like {
      background: linear-gradient(125.02deg, #236bfe -17.11%, #063ba8 98.58%);
      box-shadow: 0px 10px 25px rgba(35, 107, 254, 0.2);
      width: 6rem;
      height: 6rem;
      color: #fff;
      font-size: 3rem;
    }
  }

  @media (min-width: 600px) {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    border-radius: 1.5rem;

    .container-image {
      h2 {
        font-size: 3rem;
        height: 24%;
      }

      .liked-card {
        display: flex;
      }
    }
  }
  @media (min-width: 800px) {
    scroll-snap-align: top;
    height: 50rem;
    overflow: hidden;
    margin: 7rem 0;
  }
  @media (min-width: 1100px) {
    height: 60rem;
  }
`;

export default Card;
