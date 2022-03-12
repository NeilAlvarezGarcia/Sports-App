import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const IconAnimated = () => {
  return (
    <IconAnimation>
        <div className="second-level">
            <button className='like'>
                <FontAwesomeIcon icon={faHeart}/>
            </button>
        </div>
    </IconAnimation>
  )
}

const showIcon = keyframes`
    20% {transform: scale(1)}
    22% {
        transform: scale(1);
        .second-level {transform: scale(1)}
    }
    25% {
        transform: scale(1);
        .second-level {transform: scale(1)}
        .like {transform: scale(1)}
    }
    60% {
        transform: scale(1);
        .like {
            transform: scale(0);
        }
        .second-level {transform: scale(1);}
    }
    70% {
        transform: scale(1);
        .second-level {transform: scale(0)}
    }
    80% {transform: scale(1)}
    90% {transform: scale(1)}
    100% {transform: scale(0)}
`;

const IconAnimation = styled.div`
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
    transform: scale(0);
    animation: 2s ease ${showIcon};
    
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
`;

export default IconAnimated