import React from 'react';
import './FriendsCss.css';

const Friends = ({ friend }) => {
  const { name, teams, beersOwed } = friend;

  const totalBeersOwed = beersOwed.length;

  return (
    <div className='friend'>
      <h2>{name}</h2>
      <div>
        <p className='total-beers'>Total 🍺 Owed: {totalBeersOwed}</p>
        <p className='beers-owed'>🍺 Owed:</p>
        <ul>
          {Array.isArray(beersOwed) ? (
            beersOwed.map((beer, index) => (
              <li key={index}>{beer.description}</li>
            ))
          ) : (
            <li>No beers owed</li>
          )}
        </ul>
      </div>
      <div>
        <p className='teams'>Teams:</p>
        <ul>
          {teams.map((team, index) => (
            <li key={index}>{team}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Friends;
