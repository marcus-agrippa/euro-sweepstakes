import React from 'react';
import './FriendsCss.css';

const Friends = ({ friend }) => {
  const { name, teams, beersOwed } = friend;

  const eliminatedTeams = [
    'Ukraine',
    'Albania',
    'Croatia',
    'Czech Republic',
    'Poland',
    'Hungary',
    'Serbia',
    'Scotland',
    'Denmark',
    'Italy',
    'Slovakia',
    'Georgia',
    'Slovenia',
    'Belgium',
    'Romania',
    'Austria',
    'Germany',
    'Portugal',
    'Switzerland',
    'Turkey',
    'England',
    'France',
    'Netherlands',
  ];

  const totalBeersOwed = beersOwed.length;

  return (
    <div
      className={`friend ${name === 'Reese' ? 'wildcard' : ''} ${
        name === 'Ben' ? 'eliminated' : ''
      }`}>
      <h2>{name === 'Reese' ? `${name} - wildcard 🃏` : name}</h2>
      <div>
        <p className='total-beers'>Total 🍺 Owed: {totalBeersOwed}</p>
        <p className='beers-owed'>🍺 Owed:</p>
        <ul className='description-list'>
          {Array.isArray(beersOwed) ? (
            beersOwed.map((beer, index) => (
              <li
                key={index}
                className={
                  index % 2 === 0
                    ? 'description-list-item'
                    : 'description-list-item description-list-item-alt'
                }>
                {beer.description}
              </li>
            ))
          ) : (
            <li>No beers owed</li>
          )}
        </ul>
      </div>
      <div>
        <p className='teams'>Teams:</p>
        <ul className='teams-list'>
          {teams.map((team, index) => (
            <li
              key={index}
              className={`team-list-item ${
                eliminatedTeams.includes(team) ? 'team-eliminated' : ''
              }`}>
              {team}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
