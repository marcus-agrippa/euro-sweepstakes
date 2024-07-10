import React, { useState, useEffect } from 'react';
import './App.css';
import Friend from './Friends';
import countryAllocation from './data/country-allocation.json';
import euroFixtures from './data/euro-fixtures.json';

const App = () => {
  const [friends, setFriends] = useState(countryAllocation);
  const [fixtures, setFixtures] = useState(euroFixtures);
  const [randomNumber, setRandomNumber] = useState(null);
  const [randomName, setRandomName] = useState('');

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 10) + 1;
    setRandomNumber(number);
  };

  const generateRandomName = () => {
    const names = ['Ben', 'Greeny', 'Reese', 'Everybody'];
    const name = names[Math.floor(Math.random() * names.length)];
    setRandomName(name);
  };

  useEffect(() => {
    if (fixtures.length > 0 && friends.length > 0) {
      const updatedFriends = friends.map(friend => {
        let beersOwed = [];
        let totalBeersOwed = 0;

        fixtures.forEach(fixture => {
          let beersOwedInfo = {};

          const winnerFriend = friends.find(f =>
            f.teams.includes(fixture.homeTeam)
          )?.name;
          const loserFriend = friends.find(f =>
            f.teams.includes(fixture.awayTeam)
          )?.name;
          const winnerTeam = fixture.homeTeam;
          const loserTeam = fixture.awayTeam;

          if (winnerFriend && loserFriend && winnerFriend !== loserFriend) {
            if (
              friend.teams.includes(fixture.homeTeam) &&
              fixture.result === 'home' &&
              fixture.stage !== 'quarter' &&
              fixture.stage !== 'semi'
            ) {
              beersOwedInfo = {
                from:
                  friends.find(f => f.teams.includes(fixture.awayTeam))?.name ||
                  fixture.awayTeam,
                description: `${loserFriend} owes a 🍺 to ${winnerFriend} because ${winnerTeam} beat ${loserTeam}`,
              };
              totalBeersOwed++;
            } else if (
              friend.teams.includes(fixture.homeTeam) &&
              fixture.result === 'home' &&
              fixture.stage !== 'semi' &&
              fixture.stage === 'quarter'
            ) {
              beersOwedInfo = {
                from:
                  friends.find(f => f.teams.includes(fixture.awayTeam))?.name ||
                  fixture.awayTeam,
                description: `${loserFriend} owes a Vodka Red Bull 🟥🐂 to ${winnerFriend} because ${winnerTeam} beat ${loserTeam}`,
              };
              totalBeersOwed++;
            } else if (
              friend.teams.includes(fixture.homeTeam) &&
              fixture.result === 'home' &&
              fixture.stage === 'semi'
            ) {
              beersOwedInfo = {
                from:
                  friends.find(f => f.teams.includes(fixture.awayTeam))?.name ||
                  fixture.awayTeam,
                description: `${loserFriend} owes a Espress Martini ☕🍸 to ${winnerFriend} because ${winnerTeam} beat ${loserTeam}`,
              };
              totalBeersOwed++;
            } else if (
              friend.teams.includes(fixture.awayTeam) &&
              fixture.result === 'away'
            ) {
              beersOwedInfo = {
                from:
                  friends.find(f => f.teams.includes(fixture.homeTeam))?.name ||
                  fixture.homeTeam,
                description: `${loserFriend} owes a 🍺 to ${winnerFriend} because ${winnerTeam} beat ${loserTeam}`,
              };
              totalBeersOwed++;
            } else if (
              fixture.result === 'draw' &&
              (friend.teams.includes(fixture.homeTeam) ||
                friend.teams.includes(fixture.awayTeam))
            ) {
              // Draw case logic ommitted
            }
          }

          if (Object.keys(beersOwedInfo).length !== 0) {
            beersOwed.push(beersOwedInfo);
          }
        });

        return { ...friend, beersOwed, totalBeersOwed };
      });

      setFriends(updatedFriends);
    }
  }, []);

  return (
    <div className='app'>
      <div className='flex'>
        <img src='/euro-logo.png' width={'125px'} alt='' />
        <h2 className='app-heading'>Sweepstakes</h2>
        <p className='event-details'>Redemption Day: 20/7/24</p>
        <p className='event-details'>Venue: SLS</p>
        <button className='button' popovertarget='my-popover'>
          🥇 Prize
        </button>
        <div id='my-popover' popover='auto'>
          <p>
            2 x 🍺<br></br>1 x 🟥🐂 <br></br>from 🥈 & 🥉
          </p>
        </div>
      </div>
      {friends.map((friend, index) => (
        <Friend key={index} friend={friend} />
      ))}
      <div className='friend fixtures'>
        <h3 className='fixtures'>Semi Finals</h3>
        <h6>Espress Martini Round ☕🍸</h6>
        <p>🔥 (B) France 🇫🇷 v 🇪🇸 Spain (G)</p>
        <p>🔥 (G) Netherlands 🇳🇱 v 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 🃏 (R)</p>

        <p className='fixtures-sup'>🔥 = H2H</p>
      </div>
      <div className='flex-row'>
        <button className='button' onClick={generateRandomNumber}>
          Generate Random Number
        </button>
        {randomNumber !== null && (
          <p className='random-number'>{randomNumber}</p>
        )}
      </div>
      <div className='flex-row'>
        <button className='button' onClick={generateRandomName}>
          Drink
        </button>
        {randomName && <p className='random-number'>{randomName}</p>}
      </div>
      <p className='last-updated'>Last Updated: 10/7/24</p>
    </div>
  );
};

export default App;
