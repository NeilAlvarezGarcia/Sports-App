import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UseContext } from '../contextApi/ContextApi';
import { ContainerAuthentication, PropMode } from './Containers';

interface typeTeam {
  id: string;
  team: string;
  badge: string;
  league: string;
}

const Teams = () => {
  const { mode } = UseContext();
  const [country, setCountry] = useState('');
  const [teams, setTeams] = useState<typeTeam[]>([]);
  const [noData, setNoData] = useState('');
  const { sport } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNoData('');

    const teamArray: typeTeam[] = [];

    const res = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?s=${sport}&c=${country}`
    );

    console.log(sport, country);
    console.log(res.data);

    if (!res.data.teams) {
      setTeams([]);
      return setNoData('No result was found.');
    }

    res.data.teams.forEach((data: any) => {
      const teamData = {
        badge: data.strTeamBadge,
        team: data.strTeam,
        league: data.strLeague,
        id: data.idTeam,
      };

      teamArray.push(teamData);
    });

    setTeams(teamArray);
  };

  return (
    <ContainerTeams mode={mode}>
      <p>Search for the teams of {sport} in the diferents countries</p>
      <ContainerAuthentication mode={mode} className='removePadding'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='country'>
            Country
            <input
              type='text'
              id='country'
              autoComplete='off'
              placeholder='Spain'
              value={country}
              onChange={handleChange}
            />
          </label>
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </ContainerAuthentication>
      {noData && <p className='center'>{noData}</p>}
      <div className='list-team-cards'>
        {teams.map((team) => (
          <div key={team.id} className='team'>
            <div className='bagde'>
              <img src={team.badge} alt='team badge' />
            </div>
            <p className='league'>{team.league}</p>
            <p className='team-name'>{team.team}</p>
          </div>
        ))}
      </div>
    </ContainerTeams>
  );
};

const ContainerTeams = styled('div')<PropMode>`
  .removePadding {
    padding-top: 1rem;
  }
  form {
    display: flex;
    align-items: center;
    width: 105%;
    position: relative;

    button {
      position: absolute;
      right: 15px;
      font-size: 2rem;
      background-color: transparent;
      top: 50%;
      transform: translateY(-90%);
    }
    label {
      width: 100%;
    }
  }

  .center {
    text-align: center;
  }

  .list-team-cards {
    height: 30rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
    overflow-y: auto;
    padding-bottom: 10rem;
    text-align: center;

    .team {
      background-color: ${(prop) => (prop.mode === 'light' ? '#fff' : '#2C2B3E')};
      color: ${(prop) => (prop.mode === 'light' ? '#000' : '#fff')};
      padding: 0.5rem 1rem;
      border-radius: 0.7rem;
      .league {
        font-size: 1.3rem;
      }
      .team-name {
        font-weight: bold;
      }
    }
  }

  @media (min-width: 400px) {
    .list-team-cards {
      gap: 2rem 3rem;
      .team {
        padding: 0.5rem 1.5rem;
        border-radius: 1rem;
        .league {
          font-size: 1.3rem;
        }
        .team-name {
          font-weight: bold;
        }
      }
    }
  }

  @media (min-width: 600px) {
    .removePadding {
      justify-content: flex-start;
      padding-top: 2rem;
    }
    form {
      width: 70%;
    }

    .list-team-cards {
      gap: 2rem 3rem;
      grid-template-columns: repeat(3, 1fr);
      padding-right: 4rem;

      .team {
        padding: 0.5rem 1.5rem;
        border-radius: 1rem;
        .league {
          font-size: 1.3rem;
        }
        .team-name {
          font-weight: bold;
        }
      }
    }
  }
  @media (min-width: 750px) {
    .list-team-cards {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;

      .team {
        padding: 0.5rem 0.7rem;
        border-radius: 1rem;
        .league {
          font-size: 1.3rem;
        }
        .team-name {
          font-weight: bold;
        }
      }
    }
  }
  @media (min-width: 950px) {
    .list-team-cards {
      grid-template-columns: repeat(5, 1fr);
    }
    form {
      width: 50%;
    }
  }
  @media (min-width: 1200px) {
    .list-team-cards {
      grid-template-columns: repeat(6, 1fr);
      height: 35rem;
    }
  }
`;

export default Teams;
