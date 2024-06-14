// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Friend from './Friends';
import countryAllocation from './data/country-allocation.json'; // Update file name
import euroFixtures from './data/euro-fixtures.json'; // Update file name

const App = () => {
  const [friends, setFriends] = useState(countryAllocation); // Set initial state using imported JSON data
  const [fixtures, setFixtures] = useState(euroFixtures); // Set initial state using imported JSON data

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
              fixture.result === 'home'
            ) {
              beersOwedInfo = {
                from:
                  friends.find(f => f.teams.includes(fixture.awayTeam))?.name ||
                  fixture.awayTeam,
                description: `- ${loserFriend} owes a 🍺 to ${winnerFriend} because ${winnerTeam} beat ${loserTeam}`,
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
                description: `- ${loserFriend} owes a 🍺 to ${winnerFriend} because ${winnerTeam} beat ${loserTeam}`,
              };
              totalBeersOwed++;
            } else if (
              fixture.result === 'draw' &&
              (friend.teams.includes(fixture.homeTeam) ||
                friend.teams.includes(fixture.awayTeam))
            ) {
              // Handle draw case here if needed
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
      <p className='last-updated'>Last Updated: 14/6/24</p>
      <h2 className='app-heading'>Euro Sweepstakes</h2>
      {friends.map((friend, index) => (
        <Friend key={index} friend={friend} />
      ))}
    </div>
  );
};

export default App;
