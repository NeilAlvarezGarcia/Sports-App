import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import styled from 'styled-components'
import { UseContext } from '../contextApi/ContextApi'
import { SportSelected } from './CardHome'
import { PropMode } from './Containers'

interface Prop {
    data: SportSelected
}

const CardHistory: FC<Prop> = ({data}) => {
  const {mode} = UseContext();
  return (
    <CardContainer mode={mode} type={data.type}>
        <div className="image">
            <img src={data.strSportThumb} alt={data.strSport} />
            
            <div className="text">
                <h3>{data.strSport}</h3>
            </div>
        </div>

        <div className="icon">
            <FontAwesomeIcon icon={data.type === 'like' ? faHeart : faTimes}/>
        </div>
    </CardContainer>
  )
}

interface Type extends PropMode {
    type: string
}

const CardContainer = styled.div<Type>`
    min-height: 6.5rem;
    max-height: 6.5rem;
    display: flex;
    border-radius: 1rem;
    overflow: hidden;
    background-color: ${prop => prop.mode === 'light' ? '#fff' : '#212135'};

    .image {
        flex: 4;
        position: relative;
        border-radius: inherit;
        overflow: inherit;

        img {
            min-width: 100%;
        }

        .text {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            padding-left: 1.5rem;
            background-color: rgba(0, 0, 0, .4);
            color: #fff;
        }
    }
    .icon {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: ${prop => prop.type === 'like' ? prop.mode === 'light' ? '#2067F8' : '#fff' : '#EA596F'};
    }
`;
export default CardHistory